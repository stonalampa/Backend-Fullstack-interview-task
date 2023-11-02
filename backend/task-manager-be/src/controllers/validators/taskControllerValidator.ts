import { body, header, param, query } from "express-validator";
import { validateToken } from "../../helpers/jwtHelper";

const customValidateToken = (value: string) => {
    if (!value) {
        throw new Error("Authorization header is required");
    }

    if (!value.startsWith("Bearer ")) {
        throw new Error("Invalid Authorization header");
    }

    return validateToken(value.split(" ")[1]);
};

export const createTaskValidationRules = [
    header("Authorization").custom((value) => customValidateToken(value)),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priority")
        .isIn(["LOW", "MEDIUM", "HIGH"])
        .withMessage("Invalid priority"),
    body("ownerId").isInt().withMessage("Invalid ownerId"),
];

export const getAllTasksValidationRules = [
    header("Authorization").custom((value) => customValidateToken(value)),
    query("ownerId").isInt().withMessage("Invalid ownerId"),
];

export const validateIdParam = [
    header("Authorization").custom((value) => customValidateToken(value)),
    param("id").isInt().withMessage("Invalid id"),
];
