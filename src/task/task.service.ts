import { BusinessLogicError } from "../error/error";
import { createTaskDTO, TASK_ERRORS } from "./task.dto";
import { ITask, Task_Status } from "./task.interface";
import TaskModel from "./task.model";

interface ITaskService {
    createTask: (task: createTaskDTO) => Promise<ITask>;
    getTaskById: (taskId: string) => Promise<ITask | null>;
    updateTaskToPending: (task:ITask) => Promise<ITask>;
    updateTaskToInProgress: (task:ITask) => Promise<ITask>;
    updateTaskToCompleted: (task:ITask) => Promise<ITask>;
}

class TaskService implements ITaskService{ 
    /**
     * To create a task
     * @param createTaskDTO
     * @returns 
     */
  createTask = async ({title, createdBy, assignedTo, description, dueDate, priority}: createTaskDTO) => {
      const task = new TaskModel({
          title,
          description,
          dueDate,
          priority,
          assignedTo,
          createdBy,
          status: Task_Status.PENDING
        });
    try {
      const savedTask = await task.save();
      return savedTask;
    } catch (error) {
      throw new BusinessLogicError(
        TASK_ERRORS.TASK_CREATION_FAILED,
        'Task creation failed'
      );
    }
  };

  /**
   * get task by id
   * @param taskId 
   * @returns 
   */
  getTaskById = async (taskId: string) => {
    const task = await TaskModel.findById(taskId);
    return task
  }

  /**
   * update task to pending
   * @param task 
   * @returns 
   */
  updateTaskToPending = async (task: ITask) => {
    task.status = Task_Status.PENDING;
    await task.save();
    return task;
  }

  /**
   * update Task To In Progress
   * @param task 
   * @returns 
   */
  updateTaskToInProgress = async (task: ITask) => {
    task.status = Task_Status.IN_PROGRESS;
    await task.save();
    return task;
  }

  /**
   * Update Task To Completed
   * @param task 
   * @returns 
   */
  updateTaskToCompleted = async (task: ITask) => {
    task.status = Task_Status.COMPLETED;
    await task.save();
    return task;
  }
}

export default TaskService;
