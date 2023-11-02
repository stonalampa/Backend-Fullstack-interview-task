import { Priority, Status, PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

export const getTask = (id: number) => {
    return prisma.task.findUnique({
        where: {
            id,
        },
    });
};

export const getTasks = (ownerId: number) => {
    return prisma.task.findMany({
        where: {
            ownerId,
        },
    });
};

export const createTask = async ({
    title = "Untitled Task",
    description = "",
    ownerId,
    priority,
}: Partial<Task>) => {
    return prisma.task.create({
        data: {
            title,
            description,
            priority: priority || Priority.LOW,
            status: Status.IN_PROGRESS,
            ownerId: ownerId ?? -1,
        },
    });
};

export const updateTask = async (id: number, task: Partial<Task>) => {
    return prisma.task.update({
        where: {
            id,
        },
        data: task,
    });
};

export const deleteTask = async (id: number) => {
    return prisma.task.delete({
        where: {
            id,
        },
    });
};
