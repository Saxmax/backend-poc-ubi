import { Router, Request, Response } from 'express';
import { IDevice } from '../_common/interfaces/Device';
import { monitored_devices } from '../device_dummy_data';

const router = Router();

// Get all monitored devices.
router.get('/devices', (req: Request, res: Response) => {
  res.json(Array.from(monitored_devices.values()));
});

// Get specific device by ID.
router.get('/devices/:id', (req: Request, res: Response) => {
  const id = getIdFromObject(req.params);
  const device = getDeviceByID(id);
  if (device) {
    res.json(device);
  } else {
    res.status(404).json({ message: 'Device was not found' });
  }
});

// Register a new device for monitoring.
router.post('/devices', (req: Request, res: Response) => {
  const id = getIdFromObject(req.body);
  if (!id) {
    res.status(404).json({ message: 'No ID was passed, cannot monitor device' });
    return;
  }

  const key = getDeviceKey(id);
  if (key !== -1) {
    res.status(404).json({ message: 'Device is already being monitored' });
  } else {
    const device = createDevice(id, req.body);
    monitored_devices.set(monitored_devices.size + 1, device);
    res.status(201).json(device);
  }
});

// Update device information.
router.put('/devices/:id', (req: Request, res: Response) => {
  const id = getIdFromObject(req.params);
  if (!id) {
    res.status(404).json({ message: 'No ID was passed, cannot monitor device' });
    return;
  }

  const device = modifyDevice(id, req.body);
  if (!device) {
    res.status(404).json({ message: `Device with ID ${id} was not found` });
  } else {
    res.json(device);
  }
});

// Update device information.
router.delete('/devices/:id', (req: Request, res: Response) => {
  const id = getIdFromObject(req.params);
  if (!id) {
    res.status(404).json({ message: 'No ID was passed, cannot monitor device' });
    return;
  }

  const isDeleted = removeDevice(id);
  if (isDeleted) {
    res.status(201).json({ message: 'Device successfully removed' });
  } else {
    res.status(404).json({ message: `Device with ID ${id} was not found` });
  }
});

const getDeviceKey = (id: number): number => {
  for (const [key, device] of monitored_devices.entries()) {
    if (device.id === id) return key;
  }
  return -1;
};

const getDeviceByID = (id: number): IDevice | null => {
  const key = getDeviceKey(id);
  return key !== -1 ? monitored_devices.get(key)! : null;
};

const getIdFromObject = (object: any) => {
  return getObjectValue(object, 'id', -1);
};

const getObjectValue = (object: any, value: string, fallback = -1) => {
  if (object === undefined || object[value] === null || object[value] === undefined) {
    return fallback ?? -1;
  }

  return Number(object[value]);
};

const createDevice = (id: number, data: any) => {
  const device: IDevice = {
    id,
    status: data.status || 0,
    url: data.url || '',
  };
  return device;
};

const modifyDevice = (id: number, data: any) => {
  let device = getDeviceByID(id);
  if (!device) return null;

  device = { ...device, ...data };
  monitored_devices.set(getDeviceKey(id), device!);

  return device;
};

const removeDevice = (id: number) => {
  const key = getDeviceKey(id);
  return monitored_devices.delete(key);
};

export default router;
