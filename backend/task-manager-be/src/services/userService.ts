import { PrismaClient } from "@prisma/client";
import { comparePasswords, hashPassword } from "../helpers/encryptionHelper";
import { generateToken } from "../helpers/jwtHelper";

const prisma = new PrismaClient();

export const createUser = async (email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
};

export const getUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return false;
    }

    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
        return false;
    }

    return generateToken(user.id, user.email);
};
