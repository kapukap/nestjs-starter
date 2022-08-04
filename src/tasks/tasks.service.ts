import {Injectable, NotFoundException} from '@nestjs/common';
import {TaskStatus} from "./task-status.enum";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

// BL
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) {}

    async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        const {status, search} = getTasksFilterDto

        let tasks = await this.tasksRepository.find({})

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }

        return tasks
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id })

        if (!task) throw new NotFoundException();
        return task
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete({id})

        if (!result.affected) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status
        await this.tasksRepository.save(task)
        return task
    }

    async createTask(createTaskDto: CreateTaskDto): Promise <any> {
        return this.tasksRepository.createTask(createTaskDto)
    }
}
