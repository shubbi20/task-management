import { Request, Response, NextFunction } from 'express';

export const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
    const oldJson = res.json;
  
    res.json = function (body: any) {
      // If the response already has the success property, do not format it again
      if (body && (body.success === true || body.success === false)) {
        return oldJson.call(this, body);
      }
  
      const responseBody = {
        success: true,
        statusCode: res.statusCode,
        data: body,
        error: null
      };
  
      return oldJson.call(this, responseBody);
    };
  
    next();
  }