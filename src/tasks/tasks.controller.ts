import {Controller, Get} from '@nestjs/common';
import {TasksService} from "./tasks.service";

// Only Endpoints, Communicating with services and return res
@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks() {
        return this.taskService.getAllTasks()
    }
}
