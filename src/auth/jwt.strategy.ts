import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtConfig } from '../config/jwt.config';
import { JwtPayloadInterface } from './interface/jwt.payload.interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {
        super({
            secretOrKey: JwtConfig.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayloadInterface): Promise<User> {
        const { name } = payload;
        const user: User = await this.usersRepository.findOneBy({ name });

        if (!user) {
            throw new UnauthorizedException();
        } else {
            return user;
        }
    }
}
