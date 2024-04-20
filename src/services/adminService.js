import { axiosInstance } from "./axios.js"

export async function getAllUsers() {
  try
  {
    return await axiosInstance.get('admin/user/all')
  } catch (error)
  {
    console.error('Error on obtain all users', error)
  }
}

export async function deleteUserById(userId) {
  try
  {
    return await axiosInstance.delete(`admin/user/${userId}`)
  } catch (error)
  {
    console.error('Error on delete user ById', error)
  }
}

export async function getAllUsersTasksAdmin(username) {
  return await axiosInstance.get(`admin/user/${username}`)
}
