import { Router } from 'express';
import healthController from '../controllers/health';

const refreshRouter = Router();
refreshRouter.get('/', healthController.refreshAllManually);
refreshRouter.get('/id/:id', healthController.refreshManuallyById);
refreshRouter.get('/mac/:mac', healthController.refreshManuallyByMac);

export default refreshRouter;
