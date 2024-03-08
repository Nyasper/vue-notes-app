import axios from "./axios.js"

export async function createTask(task) {
  try {
    return await axios.post("tasks", task);
  } catch (error) {
    console.log(error);
  }
}

export async function viewAllTasks() {
  try {
    return await axios.get("tasks/all");
  } catch (error) {
    console.log(error);
    return null
  }
}

export async function getTaskById(id) {
  try {
    return await axios.get(`tasks/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function updateTask(task) {
  try {
    return await axios.put('tasks', task);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTaskById(id) {
  try {
    return await axios.delete(`tasks/${id}`);
  } catch (error) {
    console.log(error);
  }
}
