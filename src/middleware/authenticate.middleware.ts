import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const key:string= process.env.JWT_SECRET || "secret";

export const authenticate = (req: any, res: any, next: NextFunction) => {
    const token = req.get('Authorization')?.split("")[1]
    if (!token) return res.status(401).send({ error: 'Access denied. No token provided.' });
  
    try {
      const decoded = jwt.verify(token, key);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send({ error: 'Invalid token.' });
    }
  };