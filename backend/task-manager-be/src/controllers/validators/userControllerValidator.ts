import { body } from "express-validator";

export const userControllerValidator = [
    body("email")
        .isEmail()
        .withMessage("Invalid email")
        .notEmpty()
        .withMessage("Email is required"),
    body("password").isString().notEmpty().withMessage("Password is required"),
];
