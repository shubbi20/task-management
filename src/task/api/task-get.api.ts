import { Request, Response, NextFunction, Router } from "express";
import TaskService from "../task.service";
import { HTTP_STATUS_CODE } from "../../error/error.interface";
import { ControllerError } from "../../error/error";
import { TASK_ERRORS } from "../task.dto";
import { USER_ROLE_TYPE } from "../../user/user.interface";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

const getTaskHandler = async (req: any, res: any, next: any) => {
  const taskService = new TaskService();
  const taskId = req.params.taskId;

  try {
    const tasks = await taskService.getTaskById(taskId);
    if(!tasks){
        throw new ControllerError(
            TASK_ERRORS.TASK_NOT_FOUND,
           'Task not found'
        );
    }

    if(req.user.role === USER_ROLE_TYPE.SIMPLE && tasks.assignedTo?.toString() !== req.user.id){
        throw new ControllerError(
            TASK_ERRORS.TASK_INVALID_DATA,
            'User not authorized'
        )
    }

    res.status(HTTP_STATUS_CODE.Ok).send(tasks);
  } catch (err: any) {
    next(new ControllerError(
      TASK_ERRORS.TASK_NOT_FOUND,
      err.message
    ));
  }
};

router.get('/tasks/:taskId',authenticate,authorize(USER_ROLE_TYPE.ADMIN,USER_ROLE_TYPE.SIMPLE), getTaskHandler);

export default router;
