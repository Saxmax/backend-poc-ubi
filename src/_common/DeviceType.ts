import * as z from 'zod';
import { IHealthType } from './HealthType';

export const DeviceType = z.object({
  mac_address: z.string(),
  name: z.string().optional(),
  url: z.string().optional(),
});

export type IDevice = z.infer<typeof DeviceType> & IHealthType;

export const DeviceDefaults: Partial<IDevice> = {
  name: 'Unknown Device',
  url: 'N/A',
};
