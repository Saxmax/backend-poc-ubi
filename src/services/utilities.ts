import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SuccessResponseMessage } from '../interfaces/SuccessResponseMessage';
import { DeviceType, IDevice } from '../interfaces/Device';

class UtilityService {
  static successResponse = (res: Response, message: SuccessResponseMessage, status = StatusCodes.OK) => {
    const json = typeof message == 'string' ? { message } : message;
    res.status(status).json(json);
  };

  static errorResponse = (res: Response, message: string) => {
    console.log(`OnErrorDatabase :: ${message}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Database error' });
  };

  static getValidProperties = (data: unknown) => {
    const result = DeviceType.safeParse(data);

    if (result.success === false) {
      console.log(`OnErrorValidation :: ${result.error.message}`);
      return null;
    }

    return result.data;
  };
}

export default UtilityService;
