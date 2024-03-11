import axios from "./axios.js"

export async function getAllUsers() {
  try {
    return await axios.get('admin/user/all')
  } catch (error) {
    console.error('Error on obtain all users', error)
  }
}

export async function deleteUserById(userId) {
  try {
    return await axios.delete(`admin/user/${userId}`)
  } catch (error) {
    console.error('Error on delete user ById', error)
  }
}

export async function getAllUsersTasksAdmin(username) {
  try {
    return await axios.get(`admin/user/${username}`)
  } catch (error) {
    console.error('Error on obtain all taks', error)
  }
}