import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksRepository extends Repository<Task>{
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>
    ) {
        super(tasksRepository.target, tasksRepository.manager)
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.save(task);
        return task;
    }
}
