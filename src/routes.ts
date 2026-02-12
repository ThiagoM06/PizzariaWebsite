import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { createCategorySchema } from "./schemas/categorySchema";
import { isAdmin } from "./middlewares/isAdmin";

const router = Router();

//rotas users
router.post(
	"/users",
	validateSchema(createUserSchema),
	new CreateUserController().handle,
);

router.post(
	"/session",
	validateSchema(authUserSchema),
	new AuthUserController().handle,
);

router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post(
	"/category",
	isAuthenticated,
	isAdmin,
	validateSchema(createCategorySchema),
	new CreateCategoryController().handle,
);

export { router };
