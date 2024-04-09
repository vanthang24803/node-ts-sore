import * as z from "zod";

export const PlanterSchema = z.object({
  name: z.string().min(1),
});
