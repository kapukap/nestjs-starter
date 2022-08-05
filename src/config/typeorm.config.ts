import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config()

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: Boolean(process.env.TYPEORM_AUTOLOAD_ENTITIES),
    synchronize: Boolean(process.env.TYPEORM_SYNC),
};
