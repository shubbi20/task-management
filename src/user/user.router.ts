import { Router } from "express";
import userService from "./user.service";
import { authenticate } from "../middleware/authenticate.middleware";
import loginUserApi from "./api/user-login.api";
import signupUserApi from "./api/user-signup.api";
import getUserApi from "./api/user-get.api";

const router = Router();

router.use("/",loginUserApi)
router.use("/",signupUserApi)
router.use("/",getUserApi)

export default router