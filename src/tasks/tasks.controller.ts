import {Body, Controller, Get, Post} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task} from "./task.model";

// Only Endpoints, Communicating with services and return res
@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks()
    }

    @Post()
    //createTask(@Body() body)
    createTask(
        @Body('title') title: string,
        @Body('description') description: string
    ): Task {
        return this.taskService.createTask(title, description)
    }
}
