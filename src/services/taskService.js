import { axiosInstance } from "./axios.js"

export async function createTask(task) {
  try {
    return await axiosInstance.post("tasks", task);
  } catch (error) {
    console.log(error);
  }
}

export async function viewAllTasks() {
  try {
    return await axiosInstance.get("tasks/all");
  } catch (error) {
    console.log(error);
    return null
  }
}

export async function getTaskById(id) {
  try {
    return await axiosInstance.get(`tasks/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function updateTask(task) {
  try {
    return await axiosInstance.put('tasks', task);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTaskById(id) {
  try {
    return await axiosInstance.delete(`tasks/${id}`);
  } catch (error) {
    console.log(error);
  }
}
