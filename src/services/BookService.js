import axios from 'axios';

const API_URL = 'http://localhost:8080/books'; 

const getBooks = async (filters = {}) => {
    try {
        
        const isFilterEmpty = Object.keys(filters).length === 0;

        
        const response = isFilterEmpty
            ? await axios.get(API_URL) 
            : await axios.get(API_URL, { params: filters }); 

        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

const getBook = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createBook = async (book) => {
  try{ 
    const response = await axios.post(API_URL, book);
    return response.data;
} catch (error) {
    console.error("Error in createBook:", error);
    throw error;
  }
};

const updateBook = async (id, book) => {
try{
  const response = await axios.put(`${API_URL}/${id}`, book);
  return response.data;
} catch (error) {
    console.error("Error in updateBook:", error);
    throw error;
  }
};

const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const BookService = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
  };
  
export default BookService;
  