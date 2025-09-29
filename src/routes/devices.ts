import { Router } from 'express';
import deviceController from '../controllers/devices';

const devicesRouter = Router();
devicesRouter.get('/', deviceController.getDevices);
devicesRouter.get('/:id', deviceController.getDevice);
devicesRouter.post('/', deviceController.addDevice);
devicesRouter.put('/:id', deviceController.updateDevice);
devicesRouter.delete('/:id', deviceController.removeDevice);

export default devicesRouter;
