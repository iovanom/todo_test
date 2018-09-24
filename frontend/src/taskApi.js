import axios from 'axios';

const API_URL = "http://localhost:3000/task"

export default {

  getAllTasks: () => {
    return axios.get(API_URL);
  },

  getTask: id => {
    return axios.get(`${API_URL}/${id}`);
  },

  deleteTask: id => {
    return axios.delete(`${API_URL}/${id}`);
  },

  updateTask: (id, name) => {
    return axios.put(`${API_URL}/${id}`, {name});
  },

  addTask: name => {
    return axios.post(API_URL, {name});
  },

}
