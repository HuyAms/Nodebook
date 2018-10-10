"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseService {
    static successResponse(data) {
        return {
            'status': 200,
            'data': data,
        };
    }
    ;
    static failureResponse(error) {
        return {
            'message': error.message
        };
    }
}
exports.default = ResponseService;
//# sourceMappingURL=responseService.js.map