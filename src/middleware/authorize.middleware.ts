import { USER_ROLE_TYPE } from "../user/user.interface";
import User from "../user/user.model";


export const authorize = (...roles: USER_ROLE_TYPE[]) => {
    return async (req: any, res: any, next: any) => {
      try {
        const user = await User.findById(req.user._id);
        if (!user) {
          return res.status(401).send({ error: 'User not found.' });
        }
  
        // Assuming roles is an array of strings and user.roles[0] is the role of the user
        if (!roles.includes(user.role as USER_ROLE_TYPE)) {
          return res.status(403).send({ error: 'Access denied.' });
        }
  
        next();
      } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    };
  };