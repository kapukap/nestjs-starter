import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';

// Only Endpoints, Communicating with services and return res
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getTasks(filterDto)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.taskService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto
    ): Promise<Task> {
        const {status} = updateTaskStatusDto
        return this.taskService.updateTaskStatus(id, status)
    }

    @Post()
    //createTask(@Body() body)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto)
    }
}
