import { reactive } from 'vue';
import { getAllTasks } from '../services/taskService';
import type { TaskWithoutId } from '../models/task.ts';
import { LoadingHandler } from './loadingStore';

async function useTaskStore() {
	LoadingHandler.startLoading();

	const data = await getAllTasks();
	const tasks = reactive(new Map<string, TaskWithoutId>());

	// tasks.forEach(({ id, ...task }) => data.set(id, task));
	LoadingHandler.stopLoading();
}
