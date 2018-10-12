"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus = require('http-status');
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
    static badRequestError(message = 'Invalid params') {
        return new APIError(message, httpStatus.BAD_REQUEST);
    }
    /*Code 401*/
    static unauthorizedError(message = 'Unauthorize') {
        return new APIError(message, httpStatus.UNAUTHORIZED);
    }
    /*Code 404*/
    static notFoundError(message = 'Not found') {
        return new APIError(message, httpStatus.NOT_FOUND);
    }
    /*Code 415*/
    static unsupportedMediaTypeError(message = 'Invalid photo type') {
        return new APIError(message, httpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    /*Code 500*/
    static internalServerError(message = 'Unexpected database error') {
        return new APIError(message, httpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.default = APIError;
//# sourceMappingURL=apiError.js.map