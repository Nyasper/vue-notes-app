// import axios from "axios";
import axios from "axios";

export async function createTask(task) {
  try {
    await axios.post("http://localhost:3000/api/tasks", task);
  } catch (error) {
    console.log(error);
  }
}

export async function viewAllTaks() {
  try {
    const response = await axios.get("http://localhost:3000/api/tasks");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function viewIdTask(id) {
  try {
    const response = await axios.get(`http://localhost:3000/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateIdTask(id, task) {
  try {
    await axios.put(`http://localhost:3000/api/tasks/${id}`, task);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteIdTask(id, task) {
  try {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`, task);
  } catch (error) {
    console.log(error);
  }
}
