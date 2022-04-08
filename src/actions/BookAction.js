const Book = require("../models/Book");
const { cloudinary } = require("../utils/cloundinary");

module.exports = class BookAction {
  // [GET] /books
  async findAll(code) {
    const books = await Book.find();
    return JSON.stringify({
      code,
      success: true,
      message: "Get book list successfully.",
      data: books,
    });
  }
  // [GET] /books/:bookId
  async findOne(bookId, code) {
    const book = await Book.findById(bookId);
    return JSON.stringify({
      code,
      success: true,
      message: "Get book successfully.",
      data: book,
    });
  }
  // [POST] /books
  async create(req, res) {
    const newBook = new Book(req.body);
    const uploadStr = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;
    const uploadResponse = await cloudinary.uploader.upload(uploadStr);
    newBook.thumbnail = uploadResponse.url;
    newBook.save();
    return JSON.stringify({
      code: res.statusCode,
      success: true,
      message: "Create book successfully.",
      data: newBook,
    });
  }

  // [PUT] /books/:bookId
  async update(req, res) {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      return JSON.stringify({
        code: res.statusCode,
        success: false,
        message: "Book not found.",
      });
    }
    const uploadStr = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;
    const uploadResponse = await cloudinary.uploader.upload(uploadStr);
    book.name = req.body.name;
    book.description = req.body.description;
    book.author = req.body.author;
    book.isVip = req.body.isVip;
    book.prices = req.body.prices;
    book.channel = req.body.channel;
    book.thumbnail = uploadResponse.url;
    book.save();
    return JSON.stringify({
      code: res.statusCode,
      success: true,
      message: "Update book successfully.",
      data: book,
    });
  }

  // [PUT] /books/:bookId
  async delete(req, res) {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      return JSON.stringify({
        code: res.statusCode,
        success: false,
        message: "Book not found.",
      });
    }
    book.remove();
    return JSON.stringify({
      code: res.statusCode,
      success: true,
      message: "Delete book successfully.",
    });
  }
};
