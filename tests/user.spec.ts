import { IUser, USER_ROLE_TYPE } from "../src/user/user.interface";
import UserModel from "../src/user/user.model";
import UserService from "../src/user/user.service";

const user : IUser = {
    username: 'test',
    email:'test@rentickle.com',
    hashedPassword: 'test',
    role: USER_ROLE_TYPE.SIMPLE,
    createdAt: new Date(),
    updatedAt: new Date(),
    isModified: jest.fn(),
    comparePassword : jest.fn()
}

describe('user service',()=>{  
    let userService: UserService;
    beforeAll(() => {
         userService = new UserService();
    });

    it('should reture a user',async ()=>{
        UserModel.findOne = jest.fn().mockResolvedValue(user);

       const userdata = await userService.getUserByEmail(user.email)
       expect(userdata).not.toBeNull()
       expect(userdata?.username).toEqual(user.username)
    })
    
    it('user should login',async ()=>{
        const loginUser = {
            ...user ,
            _id: 1

        }
        UserModel.findOne = jest.fn().mockResolvedValue(loginUser);
        loginUser.comparePassword = jest.fn().mockResolvedValue(true);
        const data = await userService.loginUser({email:loginUser.email,password:'test'})
        expect(data).not.toBeNull()
        expect(data.id).toEqual(loginUser._id)
    })

    it('should throw error if user not found',async ()=>{
        UserModel.findOne = jest.fn().mockResolvedValue(null);
        try {
            await userService.loginUser({email:user.email,password:'test'})
        } catch (error:any) {
            expect(error.message).toEqual('Invalid Credentails')
        }
    })  
})