import { CreateProductService } from "../../services/product/CreateProductService";
import { Request, Response } from "express";

class CreateProductController {
	async handle(req: Request, res: Response) {
		const { name, price, description, category_id } = req.body;

		if (!req.file) {
			throw new Error("Arquivo de imagem é obrigatório");
		}

		const createProduct = new CreateProductService();

		const product = await createProduct.execute({
			name: name,
			price: price,
			description: description,
			category_id: category_id,
			imageBuffer: req.file.buffer,
			imageName: req.file.originalname,
		});

		res.json(product);
	}
}

export { CreateProductController };
