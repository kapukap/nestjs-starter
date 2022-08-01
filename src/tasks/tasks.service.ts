import { Injectable } from '@nestjs/common';

// BL
@Injectable()
export class TasksService {
    private tasks = []

    getAllTasks() {
        return this.tasks
    }
}
