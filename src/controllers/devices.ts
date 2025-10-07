import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import queries from '../services/queries';
import UtilityService from '../services/utilities';

class DeviceController {
  getDevices = async (_req: Request, res: Response) => {
    try {
      const devices = await queries.getDevices();
      UtilityService.successResponse(res, devices.rows);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };

  _getDevice = async (identifier: number | string, _req: Request, res: Response) => {
    try {
      const device = await queries.getDevice(identifier);
      UtilityService.successResponse(res, device.rows[0]);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };

  getDeviceById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    this._getDevice(id, req, res);
  };

  getDeviceByMac = async (req: Request, res: Response) => {
    const mac = req.params.mac.toString();
    this._getDevice(mac, req, res);
  };

  addDevice = async (req: Request, res: Response) => {
    const props = UtilityService.getValidProperties(req.body, true, false);

    if (props === null) {
      const message = `Missing value for 'mac_address' - could not monitor device.`;
      UtilityService.errorResponse(res, message);
      return;
    }

    try {
      const device = await queries.addDevice(props);
      const message = `Started monitoring device #${device.rows[0].id}`;
      UtilityService.successResponse(res, message, StatusCodes.CREATED);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };

  _updateDevice = async (identifier: number | string, req: Request, res: Response) => {
    const props = UtilityService.getValidProperties(req.body, false, true);

    try {
      const device = await queries.updateDevice(identifier, props);
      const message = `Device #${device.rows[0].id} updated`;
      UtilityService.successResponse(res, message);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };

  updateDeviceById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    this._updateDevice(id, req, res);
  };

  updateDeviceByMac = async (req: Request, res: Response) => {
    const mac = req.params.mac;
    this._updateDevice(mac, req, res);
  };

  _removeDevice = async (identifier: number | string, _req: Request, res: Response) => {
    try {
      const device = await queries.removeDevice(identifier);
      const message = `Stopped monitoring device #${device.rows[0].id}`;
      UtilityService.successResponse(res, message);
    } catch (error: any) {
      UtilityService.errorResponse(res, error.message);
    }
  };

  removeDeviceById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    this._removeDevice(id, req, res);
  };

  removeDeviceByMac = async (req: Request, res: Response) => {
    const mac = req.params.mac;
    this._removeDevice(mac, req, res);
  };
}

export default new DeviceController();
