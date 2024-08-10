import Joi from "joi";
import { Request, Response, NextFunction, Router } from "express";
import { ControllerError } from "../../error/error";
import { createTaskDTO, TASK_ERRORS } from "../task.dto";
import TaskService from "../task.service";
import { HTTP_STATUS_CODE } from "../../error/error.interface";
import { authenticate } from "../../middleware/authenticate.middleware";
import { USER_ROLE_TYPE } from "../../user/user.interface";
import { authorize } from "../../middleware/authorize.middleware";
import { Task_Priority_Type } from "../task.interface";
import UserService from "../../user/user.service";

interface taskCreateBodySchema {
    title: string;
    description: string;
    dueDate: Date;
    priority: Task_Priority_Type;
    assignedTo?: string;
}

const taskCreateSchema = Joi.object<createTaskDTO>({
  title: Joi.string().required(),
  description: Joi.string().max(500).required(),
  dueDate: Joi.date().required(),
  priority: Joi.string().valid(...Object.values(Task_Priority_Type)).default('medium'),
  assignedTo: Joi.string().optional(),
});

const router = Router();

const createTaskHandler = async (req: any, res: any, next: any) => {
  const { error } = taskCreateSchema.validate(req.body);

  if (error) {
    return next(new ControllerError(
      TASK_ERRORS.TASK_INVALID_DATA,
      error.message
    ));
  }
  
  let { title, description, dueDate, priority, assignedTo } = req.body;

  if(!assignedTo && req.user.role === USER_ROLE_TYPE.SIMPLE){ 
    assignedTo = req.user.id
  }

  const userService = await new UserService()
  const assignedToUser = await userService.getUserById(assignedTo)
  
  if(!assignedToUser){
     return next(new ControllerError(
       TASK_ERRORS.TASK_INVALID_DATA,
       'Assigned user not found'
     ));
  }

  const taskService = new TaskService();
  try {
    const task = await taskService.createTask({
        title,
        description,
        dueDate,
        priority,
        assignedTo,
        createdBy:req.user.id,
    });
    res.status(HTTP_STATUS_CODE.Created).send(task);
  } catch (err: any) {
    next(err);
  }
};

router.post('/tasks',authenticate,authorize(USER_ROLE_TYPE.ADMIN,USER_ROLE_TYPE.SIMPLE) ,createTaskHandler);

export default router;
