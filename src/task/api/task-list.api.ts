import { Router } from "express";
import TaskService from "../task.service";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { USER_ROLE_TYPE } from "../../user/user.interface";


const router = Router();

const getTaskListHandler = async (req: any, res: any, next: any) => {
    const taskService = new TaskService();
    const {title,status,priority} = req.query

    try {
        const tasks = await taskService.getTasks({title,status,priority});
        res.status(200).send(tasks);
    } catch (err: any) {
        next(err);
    }
}

router.get('/tasks',authenticate,authorize(USER_ROLE_TYPE.ADMIN), getTaskListHandler);

export default router;
    
