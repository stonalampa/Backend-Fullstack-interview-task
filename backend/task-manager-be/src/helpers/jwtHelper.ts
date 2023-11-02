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

export const validateToken = (token: string): User | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as User;
        return decoded;
    } catch (error) {
        return null;
    }
};
