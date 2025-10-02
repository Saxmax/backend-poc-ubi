import * as z from 'zod';

export const DeviceType = z.object({
  id: z.number().optional(),
  mac_address: z.string(),
  status: z.number().optional(),
  checksum: z.string().optional(),
  url: z.string().optional(),
  firmware: z.string().optional(),
  hardware: z.string().optional(),
  software: z.string().optional(),
});

export type IDevice = z.infer<typeof DeviceType>;
