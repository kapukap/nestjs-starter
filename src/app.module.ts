import {Module} from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// Properties
// - providers: array of providers to be available within the module via dependency injection
// - controllers: array of controllers to be instantiated within the module
// - exports: array providers to export other modules
// - imports: list of the modules required by this module. Any exported providers by these modules
// will now be available in our module via dependency injection
@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'taskDB',
            autoLoadEntities: true,
            synchronize: true,
        })
    ]
})
export class AppModule {}
