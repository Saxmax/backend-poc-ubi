import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IResponseMessage } from '../interfaces/ResponseMessage';

class UtilityService {
  static successResponse = (res: Response, message: IResponseMessage, status = StatusCodes.OK) => {
    const json = typeof message == 'string' ? { message } : message;
    res.status(status).json(json);
  };

  static errorResponse = (res: Response, message: string) => {
    console.log(`OnErrorDatabase :: ${message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error' });
  };
}

export default UtilityService;
