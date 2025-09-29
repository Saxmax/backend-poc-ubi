import { Router, Request, Response } from 'express';

const messages = [
  'Welcome to the Fauxbiquiti Device Monitoring API',
  '',
  "Under 'GET /help' you will find more information about",
  'the usage of this service.',
];

const apiRouter = Router();
apiRouter.get('/', async (req: Request, res: Response) => {
  return res.send({ message: messages });
});

export default apiRouter;
