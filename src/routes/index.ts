import { Router } from "express";

import userRoutes from "./user";
import authRoutes from "./auth";
import recipeRoutes from "./recipe";
const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/recipe", recipeRoutes);
export default router;
