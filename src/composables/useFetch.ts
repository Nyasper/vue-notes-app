import { reactive, ref, computed, readonly } from 'vue';
import { getAllTasks } from '../services/taskService';
import type { Task, TaskWithoutId } from '../models/task';

export function useFetch(url: string) {
	const error = ref('');
	const data = reactive(new Map<string, TaskWithoutId>());

	async function getData() {
		try {
			const tasks = await getAllTasks();
			tasks.forEach(({ id, ...task }) => data.set(id, task));
			// data.splice(0, data.length, ...tasks); // => delete all elements from the array and then insert the new ones.

			const dataMap = new Map<string, TaskWithoutId>(
				tasks.map(({ id, ...task }) => [id, task])
			);

			console.log(dataMap);
		} catch (e) {
			if (e instanceof Error) {
				error.value = e.message;
			}
		}
	}

	getData();

	const computado = computed(() => data.size);

	return { data: readonly(data), error: readonly(error), computado };
}
