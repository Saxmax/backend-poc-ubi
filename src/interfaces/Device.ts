import * as z from 'zod';

export const DeviceType = z.object({
  id: z.number().optional(),
  status: z.number().optional(),
  checksum: z.number().optional(),
  url: z.string().optional(),
  firmware: z.number().optional(),
  hardware: z.number().optional(),
  software: z.number().optional(),
});

export type IDevice = z.infer<typeof DeviceType>;
