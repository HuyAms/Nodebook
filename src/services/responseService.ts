import APIError from "../util/apiError";

interface SuccessResponse {
  status: number,
  data: any
}

interface FailureResponse {
  status: number,
  message: string
}

export default class ResponseService {

  static successResponse(data): SuccessResponse {
    return {
      'status': 200,
      'data': data,
    };
  };

  static failureResponse(error: APIError): FailureResponse {
    return {
      'status': error.status,
      'message': error.message
    }
  }
}
