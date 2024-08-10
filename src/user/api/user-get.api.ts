import Joi from "joi";
import { BusinessLogicError, ControllerError } from "../../error/error";
import { loginUserDTO, USER_ERRORS } from "../user.dto";
import UserService from "../user.service";
import { HTTP_STATUS_CODE } from "../../error/error.interface";
import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.middleware";



const router = Router();

const getUserHandler = async (req: any, res: any,next:any) => {
    const userId = req.params.userId;
    const decodedId = req.user.id

    const userService = new UserService();
       
    try{  
    const user = await userService.getUserById(userId)
    if(!user){
        throw new ControllerError(
            USER_ERRORS.USER_NOT_FOUND,
            'User not found'
        )
    }

    if(userId!==decodedId){
        throw new ControllerError(
            USER_ERRORS.USER_NOT_AUTHORIZED,
            'User not authorized'
        )
    }
          
    res.status(HTTP_STATUS_CODE.Ok).send(user)
    }catch(err:any){
        next(err);
    }
}

router.get('/users/:userId',authenticate, getUserHandler);

export default router;