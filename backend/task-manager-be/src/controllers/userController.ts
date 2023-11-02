import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createUser, getUser } from "../services/userService";

export const registerUserController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await createUser(req.body.email, req.body.password);
        res.status(201).json({ ...user, id: undefined, password: undefined });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const token = await getUser(req.body.email, req.body.password);
        token
            ? res.status(200).json({ token })
            : res.status(401).json({ message: "Invalid credentials" });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
