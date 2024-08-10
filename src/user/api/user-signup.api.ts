import Joi from "joi";
import { signupUserDTO, USER_ERRORS } from "../user.dto";
import { USER_ROLE_TYPE } from "../user.interface";
import { Router } from "express";
import { ControllerError } from "../../error/error";
import UserService from "../user.service";

const userSignupSchema = Joi.object<signupUserDTO>({
    email: Joi.string().email().required(),
    password: Joi.string()
    .min(6)
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9a-zA-Z]).{6,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must be at least 6 characters long, contain at least one uppercase letter, and at least one number or alphabet.',
      'string.min': 'Password must be at least 6 characters long.',
    }),
    username: Joi.string().required()
})

const router = Router();

const signupUserHandler = async (req: any, res: any,next:any) => {
   const {email, password, username} = req.body;

   const {error, value} = userSignupSchema.validate(req.body);

   if(error) {
    throw new ControllerError(
       USER_ERRORS.USER_INVALID_DATA,
       error.message 
    )
   }

   const userService = new UserService();
   try{
        const signupUser = await userService.signupUser({email,password,username});
        res.status(200).send(signupUser)
   }catch(err:any){
       next(err);
   }

}

router.post('/signup', signupUserHandler);

export default router;
