import * as z from 'zod';

export const BillboardSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
});

export type Billboard = z.infer<typeof BillboardSchema>;
