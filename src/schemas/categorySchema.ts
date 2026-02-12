import { z } from "zod";

export const createCategorySchema = z.object({
	body: z.object({
		name: z
			.string({ message: "Categoria precisas ser um texto" })
			.min(2, { message: "Categoria precisa conter no mínimo 2 caracteres" }),
	}),
});
