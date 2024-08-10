import { HTTP_STATUS_CODE, ServiceError } from "../error/error.interface";

enum USER_ERROR_NAME {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
    USER_UPDATION_FAILED = 'USER_UPDATION_FAILED',
    USER_CREATION_FAILED = 'USER_CREATION_FAILED',
    USER_INVALID_DATA = 'USER_INVALID_DATA',
    USER_NOT_AUTHORIZED = "USER_NOT_AUTHORIZED"
}

export const USER_ERRORS: {[key in USER_ERROR_NAME]: ServiceError } = {
    [USER_ERROR_NAME.USER_NOT_FOUND]: {
      name: USER_ERROR_NAME.USER_NOT_FOUND,
      statusCode: HTTP_STATUS_CODE.NotFound
    },
    [USER_ERROR_NAME.USER_ALREADY_EXISTS]: {
      name: USER_ERROR_NAME.USER_ALREADY_EXISTS,
      statusCode: HTTP_STATUS_CODE.Conflict
    },
    [USER_ERROR_NAME.USER_UPDATION_FAILED]: {
      name: USER_ERROR_NAME.USER_UPDATION_FAILED,
      statusCode: HTTP_STATUS_CODE.UnprocessableEntity
    },
    [USER_ERROR_NAME.USER_CREATION_FAILED]: {
      name: USER_ERROR_NAME.USER_CREATION_FAILED,
      statusCode: HTTP_STATUS_CODE.UnprocessableEntity
    },
    [USER_ERROR_NAME.USER_INVALID_DATA]: {
      name: USER_ERROR_NAME.USER_INVALID_DATA,
      statusCode: HTTP_STATUS_CODE.BadRequest
    },
    [USER_ERROR_NAME.USER_NOT_AUTHORIZED]: {
        name: USER_ERROR_NAME.USER_NOT_AUTHORIZED,
        statusCode: HTTP_STATUS_CODE.Unauthorized
    }   
  }

// login user dto
export interface loginUserDTO {
     email: string,
     password: string
}

// signup user dto
export interface signupUserDTO {
    email: string,
    password: string,
    username: string,
}
  