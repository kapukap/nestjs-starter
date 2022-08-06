import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';

// Only Endpoints, Communicating with services and return res
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');

    constructor(private taskService: TasksService) {
    }

    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUserDecorator() user: User,
    ): Promise<Task[]> {
        this.logger.verbose(`User "${user.name}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
        return this.taskService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string,
        @GetUserDecorator() user: User,
    ): Promise<Task> {
        this.logger.verbose(`User "${user.name}" retrieving task. Task id ${id}`);
        return this.taskService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id') id: string,
        @GetUserDecorator() user: User,
    ): Promise<void> {
        this.logger.verbose(`User "${user.name}" deleting task. Task id ${id}`);
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUserDecorator() user: User,
    ): Promise<Task> {
        const { status } = updateTaskStatusDto;
        this.logger.verbose(`User "${user.name}" updating task. Filters: ${JSON.stringify(updateTaskStatusDto)}`);
        return this.taskService.updateTaskStatus(id, status, user);
    }

    @Post()
    //createTask(@Body() body)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUserDecorator() user: User,
    ): Promise<Task> {
        this.logger.verbose(`User "${user.name}" creating new task. Data: ${JSON.stringify(createTaskDto)}`);
        return this.taskService.createTask(createTaskDto, user);
    }
}
