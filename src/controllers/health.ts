import { Request, Response } from 'express';
import queries from '../services/queries';
import healthService from '../services/health';
import UtilityService from '../services/utilities';

class HealthController {
  refreshAllManually = async (_req: Request, res: Response) => {
    console.log('Manual refresh of all devices triggered');
    const succeeded = await this.refreshDevices();
    if (succeeded === true) {
      UtilityService.successResponse(res, `Devices have been updated.`);
    } else {
      UtilityService.errorResponse(res, `Could not get health of all devices.`);
    }
  };

  _refreshManually = async (identifier: string | number, _req: Request, res: Response) => {
    console.log(`Manual refresh of device '${identifier}' triggered`);
    const succeeded = await this.checkDeviceHealth(identifier);
    if (succeeded === true) {
      UtilityService.successResponse(res, `Device '${identifier}' have been updated.`);
    } else {
      UtilityService.errorResponse(res, `Could not get health of device '${identifier}'..`);
    }
  };

  refreshManuallyById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    this._refreshManually(id, req, res);
  };

  refreshManuallyByMac = async (req: Request, res: Response) => {
    const mac = req.params.mac;
    this._refreshManually(mac, req, res);
  };

  refreshDevices = async () => {
    console.log('Refreshing health of all monitored devices...');
    try {
      const devices = await queries.getDevices();
      for (const device of devices.rows) {
        try {
          const health = await healthService.getDeviceHealth(device.url);
          await queries.updateDevice(device.id, health);
        } catch (e) {
          console.log(`OnRefreshDevices :: Could not refresh device #${device.id}`);
        }
      }

      return true;
    } catch (e) {
      console.log(`OnRefresh :: ${e}`);
      return false;
    }
  };

  checkDeviceHealth = async (identifier: string | number) => {
    try {
      const result = await queries.getDevice(identifier);
      const device = result.rows[0];

      const health = await healthService.getDeviceHealth(device.url!);
      await queries.updateDevice(identifier, health);
      console.log(`Updated health of device #${identifier}`);

      return true;
    } catch (e) {
      console.log(`OnDeviceHealth :: ${e}`);

      return false;
    }
  };
}

export default new HealthController();
