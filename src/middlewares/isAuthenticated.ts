import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
	sub: string;
}

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({
			error: "Token não fornecido",
		});
	}

	const [, token] = authToken.split(" ");

	try {
		const { sub } = verify(token!, process.env.JWT_SECRET as string) as PayLoad;
		console.log(sub);
	} catch (err) {
		res.status(401).json({
			error: "Token inválido",
		});
	}

	return next();
}
