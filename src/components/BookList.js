import React, { useState, useEffect } from "react";
import BookService from "../services/BookService";

const BookList = ({ books: initialBooks, setBooks, categories: initialCategories }) => {
  const [books, setLocalBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publicationDate: "",
    publisher: "",
    pages: 0,
    category_id: ""
  });

  const [editBookId, setEditBookId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(initialBooks)) {
      setLocalBooks(initialBooks);
    }
    if (Array.isArray(initialCategories)) {
      setCategories(initialCategories);
    }
  }, [initialBooks, initialCategories]);

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.publicationDate || !newBook.category_id) {
      alert("Please fill in all required fields");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(newBook.publicationDate)) {
      alert("Invalid date format. Please use YYYY-MM-DD");
      return;
    }

    const bookToSend = { 
      ...newBook, 
      pages: Number(newBook.pages),
      category_id: parseInt(newBook.category_id, 10)
    };

    setIsLoading(true);
    try {
      if (editBookId) {
        const updatedBook = await BookService.updateBook(editBookId, bookToSend);
        setBooks(books.map((book) => (book.id === editBookId ? updatedBook : book)));
      } else {
        const newBookResponse = await BookService.createBook(bookToSend);
        setBooks([...books, newBookResponse]);
      }
      resetForm();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await BookService.deleteBook(bookId);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditBook = (book) => {
    setNewBook({
      ...book,
      publicationDate: book.publicationDate.split('T')[0],
      category_id: book.category_id ? book.category_id.toString() : ''
    });
    setEditBookId(book.id);
  };

  const resetForm = () => {
    setNewBook({
      title: "",
      author: "",
      publicationDate: "",
      publisher: "",
      pages: 0,
      category_id: ""
    });
    setEditBookId(null);
  };

  const handleError = (error) => {
    console.error("Error:", error);
    alert(error.response?.data?.error || "An error occurred. Please try again.");
  };

  if (!books || !categories) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg lg:col-span-2 flex flex-col p-6">
      <h2 className="text-3xl font-semibold mb-4 text-blue-600">Books</h2>
      <div className="max-h-80 overflow-y-auto scrollbar-hide flex-grow">
        
        {books.length === 0 ? (
            <p>No books available.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <li key={book.id} className="border-2 border-blue-200 rounded-xl p-4 hover:bg-blue-50 transition duration-300">
            <div>
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
              <span className="text-sm text-gray-600">
                Published: {book.publicationDate ? new Date(book.publicationDate).toLocaleDateString() : 'Unknown'} <br />
                Category: {categories.find((cat) => cat.id === book.category_id)?.name || "Unknown"}
              </span>
            </div>
            <div className="mt-2">
              <button className="text-blue-500 mr-2 hover:underline" onClick={() => handleEditBook(book)}>
                Edit
              </button>
              <button className="text-red-500 hover:underline" onClick={() => handleDeleteBook(book.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
       )}
      </div>
      
      <div className="mt-6 border-t-2 border-blue-100 pt-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">
        {editBookId ? "Edit Book" : "Add New Book"}
      </h3>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="date"
          placeholder="Publication Date"
          value={newBook.publicationDate}
          onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
          className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="text"
          placeholder="Publisher"
          value={newBook.publisher}
          onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
          className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Number of Pages"
          value={newBook.pages}
          onChange={(e) => setNewBook({ ...newBook, pages: e.target.value })}
          className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <select
          value={newBook.category_id}
          onChange={(e) => setNewBook({ ...newBook, category_id: e.target.value })}
          className="border-2 border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
    </div>

    <button 
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-md" 
          onClick={handleAddBook}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : (editBookId ? "Update Book" : "Add Book")}
        </button>

      </div>
    </div>
    </div>
    
  );
};

export default BookList;