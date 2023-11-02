import { body, param } from "express-validator";

export const createTaskValidationRules = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priority")
        .isIn(["LOW", "MEDIUM", "HIGH"])
        .withMessage("Invalid priority"),
    body("ownerId").isInt().withMessage("Invalid ownerId"),
];

export const getAllTasksValidationRules = [
    param("ownerId").isInt().withMessage("Invalid ownerId"),
];

export const validateIdParam = [param("id").isInt().withMessage("Invalid id")];
