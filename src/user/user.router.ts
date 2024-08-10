import { Router } from "express";
import userService from "./user.service";
import { authenticate } from "../middleware/authenticate.middleware";
import loginUserApi from "./api/user-login.api";
import signupUserApi from "./api/user-signup.api";

const router = Router();

router.post("/login",loginUserApi)
router.post("/signup",signupUserApi)

export default router