import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository', { timestamp: true });

    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {
        super(tasksRepository.target, tasksRepository.manager);
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where({ user });
        if (status) {
            query.andWhere('task.status = :status', { status: status });
        }

        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` }); // for looking combinations in diff part of words
        }

        try {
            return await query.getMany();
        } catch (e) {
            this.logger.error(`Failed to get tasks for user "${user.name}". Filters: ${JSON.stringify(filterDto)}`, e.stack);
            throw new InternalServerErrorException();
        }
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });

        try {
            await this.save(task);
            return task;
        } catch (e) {
            this.logger.error(`Failed for saving new user "${user.name}". Data: ${JSON.stringify(createTaskDto)}`, e.stack);
            throw new InternalServerErrorException();
        }
    }
}
