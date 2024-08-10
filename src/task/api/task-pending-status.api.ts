import { Router } from "express";
import { ControllerError } from "../../error/error";
import { HTTP_STATUS_CODE } from "../../error/error.interface";
import { USER_ROLE_TYPE } from "../../user/user.interface";
import { TASK_ERRORS } from "../task.dto";
import TaskService from "../task.service";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

const pendingTaskHandler = async (req: any, res: any, next: any) => {
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
            'user can only change his own task status'
        ));
    }
    try {
        const pendingTasks = await taskService.updateTaskToPending(task);
        res.status(HTTP_STATUS_CODE.Ok).send({
            taskId: pendingTasks._id,
            status: pendingTasks.status
        });
    } catch (err: any) {
        next(err);
    }
}

router.patch('/tasks/:taskId/pending',authenticate,authorize(USER_ROLE_TYPE.ADMIN,USER_ROLE_TYPE.SIMPLE), pendingTaskHandler);

export default router;