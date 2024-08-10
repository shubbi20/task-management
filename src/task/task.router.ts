import { Router } from "express";
import createTaskApi from "./api/task-create.api";
import getTasksApi from "./api/task-get.api";
import updateTaskToPendingApi from "./api/task-pending-status.api";
import updateTaskToInProgressApi from "./api/task-inprogress-status.api";
import updateTaskToCompletedApi from "./api/task-completed-status.api";

const router = Router();

router.use("/", createTaskApi);
router.use("/", getTasksApi);
router.use("/", updateTaskToPendingApi);
router.use("/", updateTaskToInProgressApi);
router.use("/", updateTaskToCompletedApi);

export default router;