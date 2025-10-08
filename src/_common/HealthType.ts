import * as z from 'zod';
import { DeviceStatus } from './DeviceStatus';

export const HealthType = z.object({
  status: z.string(),
  checksum: z.string(),
  firmware: z.string(),
  hardware: z.string(),
  software: z.string(),
});

export type IHealthType = z.infer<typeof HealthType>;

export const DeviceOfflineHealth: IHealthType = {
  status: DeviceStatus.Offline,
  checksum: '-1',
  firmware: 'N/A',
  hardware: 'N/A',
  software: 'N/A',
};
