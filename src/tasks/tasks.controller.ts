import {Body, Controller, Get, Post} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task} from "./task.model";
import {CreateTaskDto} from "./dto/create-task.dto";

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
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto)
    }
}
