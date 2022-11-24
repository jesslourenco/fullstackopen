import axios from 'axios';

const baseUrl = '/api/posts';
let token = null;

const setToken = (newToken) => { token = `bearer ${newToken}`; };

const getAll = () => {
  const config = { headers: { Authorization: token } };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const remove = async (obj) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${obj.id}`, config, { data: { obj } });
  return response.data;
};

const update = async (updatedObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config);
  return response.data;
};

export default {
  getAll, create, update, setToken, remove,
};
