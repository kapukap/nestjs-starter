import {Module} from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';

// Properties
// - providers: array of providers to be available within the module via dependency injection
// - controllers: array of controllers to be instantiated within the module
// - exports: array providers to export other modules
// - imports: list of the modules required by this module. Any exported providers by these modules
// will now be available in our module via dependency injection

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule
    ]
})
export class AppModule {}
