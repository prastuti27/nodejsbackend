import { Router } from "express";

import { getById, getAll } from "../controller/user";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateReqQuery } from "../middleware/validator";
import { createUserSchema } from "../schema/user";

const router = Router();

router.get("/", getAll);

router.get("/:id", getById);

export default router;
