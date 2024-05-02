import * as z from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1),
  rangePrice: z.string().min(1),
  description: z.string().min(1).optional(),
  guide: z.string().min(1).optional(),

  optionName: z.string().min(1),
  optionPrice: z.string().min(1),
  optionSale: z.string().min(1),
  optionSize: z.string().min(1),

  categoryId: z.string().min(1),
});

const UpdateProductSchema = z.object({
  name: z.string().min(1),
  rangePrice: z.string().min(1),
  description: z.string().min(1).optional(),
  guide: z.string().min(1).optional(),
});

type Product = z.infer<typeof ProductSchema>;
type UpdateProduct = z.infer<typeof UpdateProductSchema>;

export { ProductSchema, UpdateProductSchema, Product, UpdateProduct };
