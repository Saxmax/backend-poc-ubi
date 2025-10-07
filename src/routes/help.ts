import { Router, Request, Response } from 'express';

const messages = [
  'This API exposes REST calls for monitoring devices.',
  "Under the '/devices' endpoint you may:",
  "-> Get all devices: GET '/devices'",
  "-> Get device by ID: GET '/devices/id/:id'",
  "-> Get device by mac address: GET '/devices/mac/:mac'",
  "-> Add device to monitoring: POST '/devices'",
  "-> Update device data, by ID: PUT '/devices/id/:id'",
  "-> Update device data, by mac address: PUT '/devices/mac/:mac'",
  "-> Remove device, by ID: DELETE '/devices/id/:id'",
  "-> Remove device, by mac address: DELETE '/devices/mac/:mac'",
  '',
  'Good luck!',
  'The Fauxbiquiti Team',
];

const helpRouter = Router();
helpRouter.get('/', async (_req: Request, res: Response) => {
  return res.send({ message: messages });
});

export default helpRouter;
