import { APP_ERROR_TYPE, ServiceError } from './error.interface';

export interface IBaseError {
  name: string;
  statusCode: number;
  serviceError: ServiceError;
  type: APP_ERROR_TYPE;
}

export class BaseError extends Error implements IBaseError {
  public name: string;
  public statusCode: number;
  public serviceError: ServiceError;
  public type: APP_ERROR_TYPE;

  constructor(serviceError: ServiceError, message: string, type: APP_ERROR_TYPE) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain

    const { name, statusCode } = serviceError;

    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.type = type;
    this.serviceError = serviceError;

    Error.captureStackTrace(this);
  }
}

export class ControllerError extends BaseError  {
    constructor(err: ServiceError, message: string) {
      super(err, message, APP_ERROR_TYPE.CONTROLLER_ERROR)
    }
}

export class BusinessLogicError extends BaseError {
  constructor(err: ServiceError, message: string) {
    super(err, message, APP_ERROR_TYPE.BUSINESS_LOGIC_ERROR)
  }
}