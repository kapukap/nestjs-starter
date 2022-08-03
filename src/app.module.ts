import {Module} from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from "dotenv";

// Properties
// - providers: array of providers to be available within the module via dependency injection
// - controllers: array of controllers to be instantiated within the module
// - exports: array providers to export other modules
// - imports: list of the modules required by this module. Any exported providers by these modules
// will now be available in our module via dependency injection

config()

const DATABASE_CONFIG: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
};

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot(DATABASE_CONFIG)
    ]
})
export class AppModule {}
