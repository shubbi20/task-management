import { ITask, Task_Priority_Type, Task_Status } from "../src/task/task.interface";
import TaskModel from "../src/task/task.model";
import TaskService from "../src/task/task.service";
import { IUser, USER_ROLE_TYPE } from "../src/user/user.interface";

const task = {
    title: 'Test Task',
    description: 'This is a test task',
    dueDate: new Date(),
    priority: Task_Priority_Type.MEDIUM,
    status: Task_Status.PENDING,
    assignedTo: 'testUserId',
    createdBy: 'testUserId',
    createdAt: new Date(),
    updatedAt: new Date()
};

const user : IUser = {
    username: 'test',
    email:'fake@tester.com',
    hashedPassword: 'test',
    role: USER_ROLE_TYPE.SIMPLE,
    createdAt: new Date(),
    updatedAt: new Date(),
    isModified: jest.fn(),
    comparePassword : jest.fn()
}

describe('TaskService', () => {
    let taskService: TaskService;

    beforeAll(() => {
        taskService = new TaskService();
    });

    it('should return a task by ID', async () => {
        TaskModel.findById = jest.fn().mockResolvedValue(task);

        const foundTask = await taskService.getTaskById("1");
        expect(foundTask).not.toBeNull();
        expect(foundTask?.title).toEqual(task.title);
    });

    // it('should update a task status to In Progress', async () => {
    //     const mockTask = { ...task,save: jest.fn() };
    //     mockTask.status = Task_Status.PENDING;
    //     TaskModel.findById = jest.fn().mockResolvedValue(task);

    //     const updatedTask = await taskService.updateTaskToInProgress(mockTask);
    //     expect(updatedTask.status).toEqual(Task_Status.IN_PROGRESS);
    // });

    it('should delete a task by ID', async () => {
        TaskModel.findByIdAndDelete = jest.fn().mockResolvedValue(task);

        await taskService.deleteTask("1");
        expect(TaskModel.findByIdAndDelete).toHaveBeenCalledWith("1");
    });

    it('should return an array of tasks filtered by title', async () => {
        const tasks = [task];
        TaskModel.find = jest.fn().mockResolvedValue(tasks);

        const foundTasks = await taskService.getTasks({ title: task.title, status: undefined, priority: undefined });
        expect(foundTasks).toHaveLength(1);
        expect(foundTasks[0].title).toEqual(task.title);
    });
});
