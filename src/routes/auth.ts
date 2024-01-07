import { Router } from "express";
import { registerUsers, loginUsers } from "../controller/auth";

const router = Router();

router.post("/register", registerUsers);

router.post("/login", loginUsers);

export default router;

// import { Router } from "express";

// import { getUsers, getUserById } from "../controller/user";

// const router = Router();
// router.get("/", getUsers);
// router.get("/:id", getUserById);
// // router.get("/:id",getUsers);

// export default router;
