"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus = require('http-status');
class ResponseService {
    static successResponse(data) {
        return {
            status: httpStatus.OK,
            data: data,
        };
    }
    ;
    static failureResponse(error) {
        return {
            status: error.status,
            message: error.message
        };
    }
}
exports.default = ResponseService;
//# sourceMappingURL=responseService.js.map