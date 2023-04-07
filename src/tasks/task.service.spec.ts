import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TaskStatus } from "./task-status.enum";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: "testuser",
  password: "testpass",
  id: "testid",
  tasks: [],
};

describe("TasksService", () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });
  describe("getTasks", () => {
    it("calls TasksRepository.getTasks and returns the results", async () => {
      tasksRepository.getTasks.mockResolvedValue("someValue");
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual("someValue");
    });
  });

  describe("getTaskById", () => {
    it("call TasksRpository.findOne and returns the result", async () => {
      const mockTask = {
        title: "test title",
        description: "test desc",
        id: "testId",
        status: TaskStatus.OPEN,
      };
      await tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById("testId", mockUser);
      expect(result).toEqual(mockTask);
    });
    it("call TasksRpository.findOne and handles an error", async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById("testId", mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});
