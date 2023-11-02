import jwt from "jsonwebtoken";

interface User {
    id: string;
    email: string;
    password: string;
}

const JWT_SECRET = "strongJwtSecret";

export const generateToken = (id: number, email: string): string => {
    const token = jwt.sign({ id, email }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
};

export const validateToken = async (token: string): Promise<boolean> => {
    try {
        const decoded = await jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};
