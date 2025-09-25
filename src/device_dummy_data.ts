import { IDevice } from './_common/interfaces/Device';

const devices = [
  { id: 1, status: 20, url: 'https://dummy.devices.com/a' },
  { id: 2, status: 20, url: 'https://dummy.devices.com/b' },
  { id: 3, status: 20, url: 'https://dummy.devices.com/c' },
  { id: 4, status: 20, url: 'https://dummy.devices.com/d' },
];

const getDeviceMap = () => {
  const map: Map<number, IDevice> = new Map();
  devices.forEach((device, i) => map.set(i, device));
  return map;
};

export const monitored_devices: Map<number, IDevice> = getDeviceMap();
