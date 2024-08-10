import { HTTP_STATUS_CODE, ServiceError } from "../error/error.interface";
import { Task_Priority_Type } from "./task.interface";
import { IUser } from "../user/user.interface";

enum TASK_ERROR_NAME {
  TASK_CREATION_FAILED = 'TASK_CREATION_FAILED',
  TASK_INVALID_DATA = 'TASK_INVALID_DATA',
  TASK_NOT_FOUND = 'TASK_NOT_FOUND',
  INVALID_ASSIGNED_USER = 'INVALID_ASSIGNED_USER',
}

export const TASK_ERRORS: { [key in TASK_ERROR_NAME]: ServiceError } = {
  [TASK_ERROR_NAME.TASK_CREATION_FAILED]: {
    name: TASK_ERROR_NAME.TASK_CREATION_FAILED,
    statusCode: HTTP_STATUS_CODE.UnprocessableEntity,
  },
  [TASK_ERROR_NAME.TASK_INVALID_DATA]: {
    name: TASK_ERROR_NAME.TASK_INVALID_DATA,
    statusCode: HTTP_STATUS_CODE.BadRequest,
  },
  [TASK_ERROR_NAME.TASK_NOT_FOUND]: {
    name: TASK_ERROR_NAME.TASK_NOT_FOUND,
    statusCode: HTTP_STATUS_CODE.NotFound,
  },
  [TASK_ERROR_NAME.INVALID_ASSIGNED_USER]: {
    name: TASK_ERROR_NAME.INVALID_ASSIGNED_USER,
    statusCode: HTTP_STATUS_CODE.BadRequest,
  }
};

export interface createTaskDTO {
  title: string;
  description: string;
  dueDate: Date;
  priority: Task_Priority_Type;
  assignedTo?: IUser; 
  createdBy: string;
}
