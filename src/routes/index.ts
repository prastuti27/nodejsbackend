import { Router } from "express";

import userRoutes from "./user";
import authRoutes from "./auth";
import recipeRoutes from "./recipe";
import commentRoutes from "./comments";
const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/recipe", recipeRoutes);
router.use("/api/recipe", commentRoutes);
export default router;
