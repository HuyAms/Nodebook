const httpStatus = require('http-status');

export default class APIError extends Error {
  status: number
  message: string

  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.message = message
  }

  static apiError(message, status): APIError {
    return new APIError(message, status);
  }

  /*Code 400*/
  static badRequestError(message = 'Invalid params'): APIError {
    return new APIError(message, httpStatus.BAD_REQUEST);
  }

  /*Code 401*/
  static unauthorizedError(message = 'Unauthorize'): APIError {
    return new APIError(message, httpStatus.UNAUTHORIZED);
  }


  /*Code 404*/
  static notFoundError(message = 'Not found'): APIError {
    return new APIError(message, httpStatus.NOT_FOUND);
  }

  /*Code 415*/
  static unsupportedMediaTypeError(message = 'Invalid photo type'): APIError {
    return new APIError(message, httpStatus.UNSUPPORTED_MEDIA_TYPE);
  }

  /*Code 500*/
  static internalServerError(message = 'Unexpected database error'): APIError  {
    return new APIError(message, httpStatus.INTERNAL_SERVER_ERROR);
  }
}
