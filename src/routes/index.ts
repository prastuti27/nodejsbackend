import { Router } from "express";

// import userRoutes from "./user";
import authRoutes from "./auth";
import recipeRoutes from "./recipe";
const router = Router();

// router.use("/users", userRoutes);
router.use("/api/user", authRoutes);
router.use("/api/recipe", recipeRoutes);
export default router;
