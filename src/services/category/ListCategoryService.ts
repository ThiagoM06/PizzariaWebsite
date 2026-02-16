import prismaCliente from "../../prisma";

class ListCategoryService {
	async execute() {
		try {
			const categories = await prismaCliente.category.findMany({
				select: {
					id: true,
					name: true,
					createdAt: true,
				},
				orderBy: {
					createdAt: "desc",
				},
			});

			return categories;
		} catch (err) {
			throw new Error("Erro ao listar categorias");
		}
	}
}

export { ListCategoryService };
