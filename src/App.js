import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import CategoryList from './components/CategoryList';
import FilterBooks from './components/FilterBook';
import BookService from './services/BookService';
import CategoryService from './services/CategoryService';

function App() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    
    const fetchBooksAndCategories = async () => {
      try {
        const allBooks = await BookService.getBooks();
        const allCategories = await CategoryService.getCategories();
        setBooks(allBooks);
        setCategories(allCategories);
        console.log("Fetched books:", allBooks);
        console.log("Fetched categories:", allCategories);
      } catch (error) {
        console.error("Error fetching books or categories:", error);
      }
    };

    fetchBooksAndCategories();
  }, []);

  return (
  <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
    <div className="container mx-auto p-6 ">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Book List Manager</h1>
      
      {/* Categories and Filter Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category List */}
        <div className="bg-white p-6 shadow rounded-lg">
          <CategoryList categories={categories} setCategories={setCategories} />
        </div>
        
        {/* Filter Books */}
        <div className="lg:col-span-2 bg-white p-6 shadow rounded-lg">
          <FilterBooks setFilteredBooks={setFilteredBooks} categories={categories} />
        </div>
      </div>

      {/* Book List */}
      <div className="mt-8 bg-white p-6 shadow rounded-lg">
        <BookList books={filteredBooks.length > 0 ? filteredBooks : books} setBooks={setBooks} categories={categories} />
      </div>
    </div>
  </div>
  );
};

export default App;
