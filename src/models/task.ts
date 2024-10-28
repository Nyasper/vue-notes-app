export interface Task {
	id: string;
	title: string;
	description: string;
	createdAt?: string;
}

export type TaskWithoutId = Omit<Task, 'id'>;
