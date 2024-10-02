import axios from 'axios';

const API_URL = 'http://localhost:8080/categories'; 

const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getCategory = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(API_URL, category);
  return response.data;
};

const updateCategory = async (id, category) => {
  const response = await axios.put(`${API_URL}/${id}`, category);
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const CategoryService = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
  };
  
export default CategoryService;
  
