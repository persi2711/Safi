import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Usuario } from 'src/AuthModule/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../Interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,

    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Usuario> {
    const { Id } = payload;

    const user = await this.userRepository.findOneBy({ Id });

    if (!user) throw new UnauthorizedException('Token not valid');

    if (!user.State)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return user;
  }
}
