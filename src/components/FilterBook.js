import React, { useState } from "react";
import BookService from "../services/BookService";

const FilterBooks = ({ setFilteredBooks, categories }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = async () => {
    const filters = {};
  
    if (searchText.trim() !== "") {
      filters.search = searchText.trim();
    }
    
    if (selectedCategory !== "") {
      filters.category_id = selectedCategory;
    }
  
    if (startDate !== "") {
      filters.start_date = startDate;
    }
  
    if (endDate !== "") {
      filters.end_date = endDate;
    }
    
    console.log("Applying filters:", filters);

    try {
      const filteredBooks = await BookService.getBooks(filters);
      console.log("Filtered books:", filteredBooks);
      setFilteredBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching filtered books: ", error);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">Filter Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by Title, Author, Publisher"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-2 border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border-2 border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border-2 border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border-2 border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition duration-300 shadow-md" onClick={handleFilter}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBooks;