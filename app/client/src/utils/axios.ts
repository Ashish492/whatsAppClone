// axiosConfig.ts
import axios from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  timeout: 5000, // Set a timeout if needed
  withCredentials: true, // Include credentials with requests
})
export default instance
