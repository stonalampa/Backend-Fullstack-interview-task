import express from "express";
import {
    registerUserController,
    loginUserController,
} from "../controllers/userController";
import { userControllerValidator } from "../controllers/validators/userControllerValidator";

const router = express.Router();

router.post("/", userControllerValidator, registerUserController);
router.post("/login", userControllerValidator, loginUserController);

export default router;
