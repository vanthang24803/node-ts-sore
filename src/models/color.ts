import * as z from "zod";

export const ColorSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export type Color = z.infer<typeof ColorSchema>;
