import React, { useEffect, useState } from "react";
import CategoryService from "../services/CategoryService";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null); 
  const [editCategoryName, setEditCategoryName] = useState("");

  useEffect(() => {
   
    CategoryService.getCategories().then(data => setCategories(data));
  }, []);

  const handleAddCategory = () => {
    if (editCategoryId) {
      
      CategoryService.updateCategory(editCategoryId, { name: editCategoryName }).then(updatedCategory => {
        setCategories(categories.map((cat) => (cat.id === editCategoryId ? updatedCategory : cat)));
        setEditCategoryId(null); 
        setEditCategoryName("");
      });
    } else {
      
      CategoryService.createCategory({ name: newCategory }).then(category => {
        setCategories([...categories, category]);
        setNewCategory("");
      });
    }
  };

  const handleDeleteCategory = (categoryId) => {
    CategoryService.deleteCategory(categoryId).then(() => {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    });
  };

  const handleEditCategory = (category) => {
    setEditCategoryId(category.id); 
    setEditCategoryName(category.name);
  };

  return (
    <div className="mt-2 bg-white rounded-xl shadow-lg p-6 ">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">Categories</h2>

      <ul className="max-h-20 mb-4 space-y-2 overflow-y-auto scrollbar-hide flex-grow">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
            <span>{category.name}</span>
            <div>
              <button
                className="text-blue-500 mr-2 hover:underline"
                onClick={() => handleEditCategory(category)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4"></div>
      <input
        type="text"
        value={editCategoryId ? editCategoryName : newCategory}
        onChange={(e) => editCategoryId ? setEditCategoryName(e.target.value) : setNewCategory(e.target.value)}
        placeholder={editCategoryId ? "Edit Category Name" : "New Category"}
        className="w-full border-2 border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <button className="mt-2 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition duration-300 shadow-md" onClick={handleAddCategory}>
        {editCategoryId ? "Update Category" : "Add Category"}
      </button>
    </div>
  );
};

export default CategoryList;
