import axios from 'axios';

const baseUrl = '/api/posts';
let token;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = { headers: { Authorization: token } };
  const response = await axios.get(baseUrl, config);
  return response.data.sort((a, b) => b.likes - a.likes);
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const remove = async (obj) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${obj.id}`, config, {
    data: { obj },
  });
  return response.data;
};

const update = async (obj) => {
  const config = { headers: { Authorization: token } };
  const updatedObj = { ...obj, likes: obj.likes + 1 };
  const response = await axios.put(
    `${baseUrl}/${updatedObj.id}`,
    updatedObj,
    config,
  );
  return response.data;
};

const newComment = async (postId, content) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(`${baseUrl}/${postId}/comments`, content, config);
  return response.data;
};

export default {
  getAll,
  create,
  update,
  setToken,
  remove,
  newComment,
};
