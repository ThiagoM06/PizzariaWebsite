import prismaClient from "../../prisma";
import cloudinary from "../../config/cloudinary";
import { Readable } from "node:stream";

interface CreateProductServiceProps {
	name: string;
	price: number;
	description: string;
	category_id: string;
	imageBuffer: Buffer;
	imageName: string;
}

class CreateProductService {
	async execute({
		name,
		price,
		description,
		category_id,
		imageBuffer,
		imageName,
	}: CreateProductServiceProps) {
		const categoryExists = await prismaClient.category.findFirst({
			where: {
				id: category_id,
			},
		});

		if (!categoryExists) {
			throw new Error("Categoria não encontrada!");
		}

		let bannerUrl = "";

		try {
			const result = await new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					{
						folder: "products",
						resource_type: "image",
						public_id: `${Date.now()}-${imageName.split(".")[0]}`,
					},
					(error: any, result: any) => {
						if (error) reject(error);
						else resolve(result);
					},
				);

				const bufferStream = Readable.from(imageBuffer);
				bufferStream.pipe(uploadStream);
			});
		} catch (err) {
			console.log(err);
			throw new Error("Erro ao enviar imagem para o Cloudinary");
		}

		return "PRODUTO CRIADO";
	}
}

export { CreateProductService };
