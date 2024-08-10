import { Router } from "express";
import { ControllerError } from "../../error/error";
import { HTTP_STATUS_CODE } from "../../error/error.interface";
import { USER_ROLE_TYPE } from "../../user/user.interface";
import { TASK_ERRORS } from "../task.dto";
import TaskService from "../task.service";
import { authorize } from "../../middleware/authorize.middleware";
import { authenticate } from "../../middleware/authenticate.middleware";

const router = Router();

const deleteTaskHandler = async (req: any, res: any, next: any) => {
    const taskService = new TaskService();
    const taskId = req.params.taskId;

    const task = await taskService.getTaskById(taskId);
    if (!task) {
        return next(new ControllerError(
            TASK_ERRORS.TASK_NOT_FOUND,
            'Task not found'
        ));
    }

    if(req.user.role === USER_ROLE_TYPE.SIMPLE && task.assignedTo?.toString() !== req.user.id){
        return next(new ControllerError(
            TASK_ERRORS.INVALID_ASSIGNED_USER,
            'user can only delete his own task'
        ));
    }
    try {
        await taskService.deleteTask(taskId);
        res.status(HTTP_STATUS_CODE.Ok).send({
            taskId: task._id,
            status: 'deleted'
        });
    } catch (err: any) {
        next(err);
    }
}

router.delete('/tasks/:taskId',authenticate,authorize(USER_ROLE_TYPE.ADMIN), deleteTaskHandler);

export default router;