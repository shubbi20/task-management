import { Router } from "express";
import createTaskApi from "./api/task-create.api";
import getTasksApi from "./api/task-get.api";

const router = Router();

router.use("/", createTaskApi);
router.use("/", getTasksApi);

export default router;