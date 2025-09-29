import 'dotenv/config';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import queries from '../services/queries';
import { IDevice } from '../interfaces/Device';
import UtilityService from '../services/utilities';

class DeviceController {
  getDevices = async (req: Request, res: Response) => {
    try {
      const devices = await queries.getDevices();
      UtilityService.successResponse(res, devices.rows);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };

  getDevice = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const device = await queries.getDeviceById(id);
      UtilityService.successResponse(res, device.rows);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };

  addDevice = async (req: Request, res: Response) => {
    const { id, status, checksum, url }: Partial<IDevice> = req.body;

    try {
      const device = await queries.addDevice({ id, status, checksum, url });
      const message = `Started monitoring device #${id}`;
      UtilityService.successResponse(res, message, StatusCodes.CREATED);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };

  updateDevice = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { status, checksum, url }: Partial<IDevice> = req.body;

    try {
      const device = await queries.addDevice({ id, status, checksum, url });
      const message = `Device #${id} updated`;
      UtilityService.successResponse(res, message);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };

  removeDevice = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const device = await queries.removeDevice(id);
      const message = `Stopped monitoring device #${id}`;
      UtilityService.successResponse(res, message);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };
}

export default new DeviceController();
