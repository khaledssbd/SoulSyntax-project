import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};

const sendResponse = <T>(res: Response, resData: TResponse<T>) => {
  res.status(resData.statusCode).json({
    success: resData.success,
    message: resData.message,
    statusCode: resData.statusCode,
    data: resData.data,
  });
};

export default sendResponse;
