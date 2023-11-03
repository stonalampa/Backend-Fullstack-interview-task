import api from "../helpers/api";
import { getIdFromToken, getToken } from "../helpers/tokenHelper";

export type Task = {
    id?: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    ownerId: number;
};

export const getTasks = async (): Promise<Array<Task>> => {
    const response = await api.get(`/task?ownerId=${getIdFromToken()}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    console.log(response.data);
    return response.data;
};

export const getTask = async (id: string): Promise<Task> => {
    const response = await api.get(`/task/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
};

export const createTask = async (data: Partial<Task>): Promise<Task> => {
    console.log(`Bearer ${getToken()}`);
    const response = await api.post("/task", data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
};

export const updateTask = async (data: Partial<Task>): Promise<Task> => {
    const response = await api.patch(`/task/${data.id}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
};

export const deleteTask = async (id: string): Promise<Task> => {
    const response = await api.delete(`/task/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
};
