import { Request, Response, NextFunction } from 'express';
import { BaseError } from './error';

export const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errorName = err.name || 'UNKNOWN_ERROR';
    const errorType = err.type || 'UNKNOWN_ERROR_TYPE';
  
    res.status(statusCode).json({
      success: false,
      statusCode,
      data: {},
      error: {
        name: errorName,
        message,
        type: errorType
      }
    });
  
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
  };

