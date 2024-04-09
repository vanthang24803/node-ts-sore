import * as z from "zod";

export const OptionSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  sale: z.number().min(0),
  size: z.string().min(1),
});
