import { USER_ROLE_TYPE } from "../user/user.interface";
import User from "../user/user.model";


export const authorize = (...roles: USER_ROLE_TYPE[]) => {
    return async (req: any, res: any, next: any) => {
      try {
        let role = req.user.role
  
        if (!roles.includes(role as USER_ROLE_TYPE)) {
          return res.status(403).send({ error: 'Access denied.' });
        }
  
        next();
      } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    };
  };