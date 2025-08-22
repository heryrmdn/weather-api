interface Response {
  status: number;
  message: string;
  data?: any;
  error?: any;
}

interface ResponseUtil {
  responseMessage(status: number, message: string): Response;
  responseData(status: number, message: string, data: any): Response;
  responseError(status: number, message: string, err: any): Response;
}

const response = (): ResponseUtil => {
  const responseMessage = (status: number, message: string): Response => {
    const response = {
      status: status,
      message: message,
    };
    return response;
  };

  const responseData = (status: number, message: string, data: any): Response => {
    const response = {
      status: status,
      message: message,
      data: data,
    };
    return response;
  };

  const responseError = (status: number, message: string, error: any): Response => {
    const response = {
      status: status,
      message: message,
      error: error,
    };
    return response;
  };

  return {
    responseMessage,
    responseData,
    responseError,
  };
};

export const responseUtil = response();
