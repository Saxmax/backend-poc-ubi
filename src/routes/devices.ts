import { Router } from 'express';
import deviceController from '../controllers/devices';

const devicesRouter = Router();
devicesRouter.get('/', deviceController.getDevices);
devicesRouter.get('/id/:id', deviceController.getDeviceById);
devicesRouter.get('/mac/:mac', deviceController.getDeviceByMac);
devicesRouter.post('/', deviceController.addDevice);
devicesRouter.put('/id/:id', deviceController.updateDeviceById);
devicesRouter.put('/mac/:mac', deviceController.updateDeviceByMac);
devicesRouter.delete('/id/:id', deviceController.removeDeviceById);
devicesRouter.delete('/mac/:mac', deviceController.removeDeviceByMac);

export default devicesRouter;
