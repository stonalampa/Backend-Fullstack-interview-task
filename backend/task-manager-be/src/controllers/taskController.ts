import { Priority, Task } from "@prisma/client";
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask,
} from "../services/taskService";
import { validationResult } from "express-validator";
import { Request, Response } from "express";

export const getTaskController = async (req: Request, res: Response) => {
    try {
        const task = await getTask(Number.parseInt(req.params.id));
        res.status(200).json(task);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getAllTasksController = async (req: Request, res: Response) => {
    try {
        const tasks = await getTasks(
            Number.parseInt(req.query.ownerId as string)
        );
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const createTaskController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const props: Partial<Task> = {
            title: req.body?.title,
            description: req.body?.description,
            priority: req.body?.priority as Priority,
            ownerId: req.body?.ownerId,
        };
        const task = await createTask(props);
        res.status(201).json(task);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTaskController = async (req: Request, res: Response) => {
    try {
        const props: Partial<Task> = {
            title: req.body?.title,
            description: req.body?.description,
            priority: req.body?.priority as Priority,
            status: req.body?.status,
            ownerId: req.body?.ownerId,
        };
        const task = await updateTask(Number.parseInt(req.params.id), props);
        res.status(200).json(task);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        const task = await deleteTask(Number.parseInt(req.params.id));
        res.status(200).json(task);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
