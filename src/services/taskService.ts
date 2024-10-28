import { axiosInstance } from './axios.js';
import type { Task } from '../models/task.js';

export async function createTask(task: Task): Promise<Task | null> {
	try {
		const { data } = await axiosInstance.post<Task>('tasks', task);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getAllTasks(): Promise<Task[]> {
	try {
		const { data } = await axiosInstance.get<Task[]>('tasks/all');
		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function getTaskById(id: string): Promise<Task | null> {
	try {
		const { data } = await axiosInstance.get<Task>(`tasks/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function updateTask(task: Task): Promise<Task | null> {
	try {
		const { data } = await axiosInstance.put<Task>('tasks', task);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function deleteTaskById(id: string): Promise<Task | null> {
	try {
		const { data } = await axiosInstance.delete(`tasks/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}
