import { Router } from "express";
import { registerUsers, loginUsers } from "../controller/auth";
import { validateReqBody } from "../middleware/validator";
import { createUserSchema } from "../schema/user";

const router = Router();

router.post("/register", validateReqBody(createUserSchema), registerUsers);

router.post("/login", loginUsers);

export default router;

// import { Router } from "express";

// import { getUsers, getUserById } from "../controller/user";

// const router = Router();
// router.get("/", getUsers);
// router.get("/:id", getUserById);
// // router.get("/:id",getUsers);

// export default router;
