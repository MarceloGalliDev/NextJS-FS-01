import { z } from "zod";

// validando novamente os campos usando zod
export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  price: z.number().min(0.01,{ message: "Preço deve ser maior que 0" }),
  stock: z.coerce.number().positive({message: 'A quantidade do estoque deve ser positiva.'}).int().min(0, { message: "Estoque deve ser maior ou igual a 0" }),
})

export type CreateProductSchema = z.infer<typeof createProductSchema>;