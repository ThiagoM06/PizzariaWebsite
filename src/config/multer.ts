import multer from "multer";

export default {
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // Limite de 5MB
	},
	fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
		const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(
				new Error("Tipo de arquivo não permitido. Apenas imagens são aceitas."),
			);
		}
	},
};
