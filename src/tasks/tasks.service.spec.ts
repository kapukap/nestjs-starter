import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
});

const mockUser = {
    name: 'GG',
    id: 'id',
    password: 'pass',
    tasks: [],
};

describe('TaskService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        // init a NestJS module with tasksService and tasksRepository
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository },
            ],
        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository);
    });

    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and returns the result', async () => {
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            expect(result).toEqual('someValue');
        });
    });

    describe('getTaskById', () => {
        it('calls TasksRepository.findOneBy and returns the result', async () => {
            const mockTask = {
                title: 'Test Title',
                description: 'Test, Desc',
                id: 'someId',
                status: TaskStatus.OPEN,
            };

            tasksRepository.findOneBy.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('calls TasksRepository.findOneBy and handles the error', async () => {
            tasksRepository.findOneBy.mockResolvedValue(null);
            expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(NotFoundException);
        });
    });
});
