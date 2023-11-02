import express from "express";
import {
    createTaskController,
    deleteTaskController,
    getAllTasksController,
    getTaskController,
    updateTaskController,
} from "../controllers/taskController";
import {
    createTaskValidationRules,
    getAllTasksValidationRules,
    validateIdParam,
} from "../controllers/validators/taskControllerValidator";

const router = express.Router();

router.get("/", getAllTasksValidationRules, getAllTasksController);
router.get("/:id", validateIdParam, getTaskController);
router.post("/", createTaskValidationRules, createTaskController);
router.patch("/:id", validateIdParam, updateTaskController);
router.delete("/:id", validateIdParam, deleteTaskController);

export default router;
