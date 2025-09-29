import { Router } from 'express';
import queries from '../services/queries';

const devicesRouter = Router();
devicesRouter.get('/', queries.getDevices);
devicesRouter.get('/:id', queries.getDeviceById);
devicesRouter.post('/', queries.addDevice);
devicesRouter.put('/:id', queries.updateDevice);
devicesRouter.delete('/:id', queries.removeDevice);

export default devicesRouter;
