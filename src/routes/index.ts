import { Router } from "express";

import userRoutes from "./user";
import authRoutes from "./auth";
import recipeRoutes from "./recipe";
import commentRoutes from "./comments";
import savedRecipeRoutes from "./savedRecipe";
import likeRoutes from "./like";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/recipe", recipeRoutes);
router.use("/api/recipe", commentRoutes);
router.use("/api/recipe", savedRecipeRoutes);
router.use("/api/recipe", likeRoutes);
export default router;
