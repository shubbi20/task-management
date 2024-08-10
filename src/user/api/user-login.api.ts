import Joi from "joi";
import { BusinessLogicError, ControllerError } from "../../error/error";
import { loginUserDTO, USER_ERRORS } from "../user.dto";
import UserService from "../user.service";
import { HTTP_STATUS_CODE } from "../../error/error.interface";
import { Router } from "express";

const userLoginSchema = Joi.object<loginUserDTO>({
    email: Joi.string().email().required(),
    password: Joi.string()
    .min(6)
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9a-zA-Z]).{6,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must be at least 6 characters long, contain at least one uppercase letter, and at least one number or alphabet.',
      'string.min': 'Password must be at least 6 characters long.',
    }),
})

const router = Router();

const loginUserHandler = async (req: any, res: any,next:any) => {
    const { email, password } = req.body;

    const {error, value} = userLoginSchema.validate(req.body);

    if(error) {
        throw new BusinessLogicError(
           USER_ERRORS.USER_INVALID_DATA,
           error.message 
        )
    }

    const userService = new UserService();
   try{  
       const loginUser = await userService.loginUser({email,password});
       
       res.status(HTTP_STATUS_CODE.Ok).send(loginUser)
    }catch(err:any){
        next(new BusinessLogicError(
            USER_ERRORS.USER_NOT_FOUND,
            err.message
        ));
    }
}

router.post('/login', loginUserHandler);

export default router;



