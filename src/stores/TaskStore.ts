import { reactive, readonly, ref } from 'vue';
import { getAllTasks } from '../services/taskService';
import { LoadingStore } from './loadingStore';
import type { TaskWithoutId } from '../models/task';

function useTaskStore() {
	const tasks = reactive(new Map<string, TaskWithoutId>());
	const error = ref<string | null>(null);

	async function getData() {
		LoadingStore.startLoading();
		try {
			const data = await getAllTasks();
			data.forEach(({ id, ...task }) => tasks.set(id, task));
			// data.splice(0, data.length, ...tasks); // => delete all elements from the array and then insert the new ones.
		} catch (e) {
			if (e instanceof Error) {
				error.value = e.message;
				console.error(e.message);
			} else {
				error.value = e as string;
				console.error(e);
			}
		} finally {
			LoadingStore.stopLoading();
		}
	}
	getData();

	return {
		tasks: readonly(tasks),
		error,
	};
}

export const TaskStore = useTaskStore();
