const Category = require("../models/Category");

module.exports = class CategoryAction {
  // [GET] /categories
  async findAll(code) {
    const categories = await Category.find();
    return JSON.stringify({
      code,
      success: true,
      message: "Get category list successfully.",
      data: categories,
    });
  }
  async findOne(categoryId, code) {
    const category = await Category.findById(categoryId);
    return JSON.stringify({
      code,
      success: true,
      message: "Get category successfully.",
      data: category,
    });
  }
  async create(name, description, code) {
    const category = new Category({
      name,
      description,
    });
    const newCategory = await category.save();
    return JSON.stringify({
      code,
      success: true,
      message: "Create category successfully.",
      data: newCategory,
    });
  }
  async update(categoryId, name, description, code) {
    const category = await Category.findById(categoryId);
    category.name = name;
    category.description = description;
    const updatedCategory = await category.save();
    return JSON.stringify({
      code,
      success: true,
      message: "Update category successfully.",
      data: updatedCategory,
    });
  }
  async delete(categoryId, code) {
    const category = await Category.findById(categoryId);
    await category.remove();
    return JSON.stringify({
      code,
      success: true,
      message: "Delete category successfully.",
    });
  }
};
