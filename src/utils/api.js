import axios from "axios";
import { useAuthStore } from '../store/useAuthStore.js';
const API_URL = import.meta.env.DEV ? import.meta.env.VITE_REQUEST_URL : '';

axios.defaults.headers.post['Content-Type'] = 'application/json';


axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const authStore = useAuthStore()
      authStore.logout()
    }
  });

const handleResponse = response => {
  const { data } = response;

  return data;
}
//Здесь должен был быть метод login, но из-за моков пришлось немного поменять логику
// export const loginUser = (user, password) => {
//   return axios
//     .post(API_URL + 'login', {
//       user: user,
//       password: password
//     })
//     .then(response => handleResponse(response))
//     .catch(error => console.log(error))
// }

export const getUserInfo = (user, password) => {
  return axios
    .get(API_URL + `users?user=${user}&password=${password}`)
    .then(response => handleResponse(response))
    .catch(error => console.log(error))
}

export const logout = () => {
  return { success: true }
}

export const getOrders = () => {
  return axios
    .get(API_URL + 'orders')
    .then(response => handleResponse(response))
    .catch(error => console.log(error))
}

export const deleteOrderFromList = id => {
  return axios
    .delete(API_URL + `orders/${id}`)
    .then(response => handleResponse(response))
    .catch(error => console.log(error))
}

export const changeStatusOrderFromList = (id, newStatus) => {
  return axios
    .patch(API_URL + `orders/${id}`, {
      status: newStatus,
    })
    .then(response => handleResponse(response))
    .catch(error => console.log(error))
}

export const createAnOrderFromList = data => {
  return axios
    .post(API_URL + 'orders', data)
    .then(response => handleResponse(response))
    .catch(error => console.log(error))
}