import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config()

export const JwtConfig: JwtModuleOptions = {
    secret: process.env.JWT_TOKEN,
    signOptions: {
        expiresIn: process.env.EXPIRES_IN,
    },
};
