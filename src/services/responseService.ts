interface SuccessResponse {
  status: number,
  data: any
}

interface FailureResponse {
  message: string
}

export default class ResponseService {

  static successResponse(data): SuccessResponse {
    return {
      'status': 200,
      'data': data,
    };
  };

  static failureResponse(error: Error): FailureResponse {
    return {
      'message': error.message
    }
  }
}
