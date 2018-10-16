"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus = require('http-status');
var ErrorMessage;
(function (ErrorMessage) {
    //default error message
    ErrorMessage["BAD_REQUEST"] = "Invalid params";
    ErrorMessage["UNAUTHORIZED"] = "Unauthorize";
    ErrorMessage["NOT_FOUND"] = "Not found";
    ErrorMessage["UNSUPPORTED_MEDIA_TYPE"] = "Invalid media type";
    //error messsage
    ErrorMessage["USER_NOT_FOUND"] = "Cannot find user with that id";
})(ErrorMessage = exports.ErrorMessage || (exports.ErrorMessage = {}));
class APIError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.message = message;
    }
    static apiError(message, status) {
        return new APIError(message, status);
    }
    /*Code 400*/
    static badRequestError(message = ErrorMessage.BAD_REQUEST) {
        return new APIError(message, httpStatus.BAD_REQUEST);
    }
    /*Code 401*/
    static unauthorizedError(message = ErrorMessage.UNAUTHORIZED) {
        return new APIError(message, httpStatus.UNAUTHORIZED);
    }
    /*Code 404*/
    static notFoundError(message = ErrorMessage.NOT_FOUND) {
        return new APIError(message, httpStatus.NOT_FOUND);
    }
    /*Code 415*/
    static unsupportedMediaTypeError(message = ErrorMessage.UNSUPPORTED_MEDIA_TYPE) {
        return new APIError(message, httpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    /*Code 500*/
    static internalServerError(message = 'Unexpected database error') {
        return new APIError(message, httpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.default = APIError;
//# sourceMappingURL=apiError.js.map