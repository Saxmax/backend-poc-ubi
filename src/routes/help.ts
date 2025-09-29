import { Router, Request, Response } from 'express';

const messages = [
  'This API exposes REST calls for monitoring devices.',
  "Under the '/devices' endpoint you may:",
  "-> Get all devices: GET '/devices'",
  "-> Get specific device: GET '/devices/:id'",
  "-> Add device to monitoring: POST '/devices'",
  "-> Update monitored device data: PUT '/devices/:id'",
  "-> Stop monitoring device: DELETE '/devices/:id'",
  '',
  'Good luck!',
  'The Fauxbiquiti Team',
];

const helpRouter = Router();
helpRouter.get('/', async (req: Request, res: Response) => {
  return res.send({ message: messages });
});

export default helpRouter;
