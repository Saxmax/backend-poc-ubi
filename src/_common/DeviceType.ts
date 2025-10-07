import * as z from 'zod';

export const DeviceType = z.object({
  mac_address: z.string(),
  name: z.string().optional(),
  url: z.string().optional(),
  checksum: z.string().optional(),
  status: z.string().optional(),
  firmware: z.string().optional(),
  hardware: z.string().optional(),
  software: z.string().optional(),
});

export type IDevice = z.infer<typeof DeviceType>;

export const DeviceDefaults: Partial<IDevice> = {
  name: 'Unknown Device',
  url: '',
  checksum: '-1',
  status: 'unknown',
  firmware: 'N/A',
  hardware: 'N/A',
  software: 'N/A',
};
