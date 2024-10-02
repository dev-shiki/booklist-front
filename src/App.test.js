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

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Book List Manager</h1>
      
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
  );
};


export default App;
