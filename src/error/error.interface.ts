
export enum HTTP_STATUS_CODE {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    UnprocessableEntity = 422,
    InternalServerError = 500,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    Ok = 200,
    Created = 201,
    Updated = 200,
    Conflict = 409
}

export type ServiceError = {
    name: string;
    statusCode: HTTP_STATUS_CODE;
};

export enum APP_ERROR_TYPE {
    APPLICATION_ERROR = 'APPLICATION_ERROR',
    CONTROLLER_ERROR = 'CONTROLLER_ERROR',
    RPC_ERROR = 'RPC_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    CONFIG_ERROR = 'CONFIG_ERROR',
    BUSINESS_LOGIC_ERROR = 'BUSINESS_LOGIC_ERROR',
    SERVICE_UNAVAILABLE_ERROR = 'SERVICE_UNAVAILABLE_ERROR',
  }
  