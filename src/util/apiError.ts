const httpStatus = require('http-status');

export enum ErrorMessage {

  //default error message
  BAD_REQUEST = 'Invalid params',
  UNAUTHORIZED = 'Unauthorize',
  NOT_FOUND = 'Not found',
  UNSUPPORTED_MEDIA_TYPE = 'Invalid media type',

  //error messsage
  USER_NOT_FOUND = 'Cannot find user with that id',

}

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
  static badRequestError(message = ErrorMessage.BAD_REQUEST): APIError {
    return new APIError(message, httpStatus.BAD_REQUEST);
  }

  /*Code 401*/
  static unauthorizedError(message = ErrorMessage.UNAUTHORIZED): APIError {
    return new APIError(message, httpStatus.UNAUTHORIZED);
  }


  /*Code 404*/
  static notFoundError(message = ErrorMessage.NOT_FOUND): APIError {
    return new APIError(message, httpStatus.NOT_FOUND);
  }

  /*Code 415*/
  static unsupportedMediaTypeError(message = ErrorMessage.UNSUPPORTED_MEDIA_TYPE): APIError {
    return new APIError(message, httpStatus.UNSUPPORTED_MEDIA_TYPE);
  }

  /*Code 500*/
  static internalServerError(message = 'Unexpected database error'): APIError  {
    return new APIError(message, httpStatus.INTERNAL_SERVER_ERROR);
  }
}
