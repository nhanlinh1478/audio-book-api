const Book = require("../models/Book");
const { cloudinary } = require("../utils/cloundinary");
const { validURL } = require("../utils/helper");

const isBase64 = require("is-base64");

module.exports = class BookAction {
  async findAll(code) {
    const books = await Book.find().populate("categoryId");
    return JSON.stringify({
      code,
      success: true,
      message: "Get book list successfully.",
      data: books,
    });
  }

  async findOne(bookId, code) {
    const book = await Book.findById(bookId).populate("categoryId");
    if (!book) {
      return JSON.stringify({
        code,
        success: false,
        message: "Book not found.",
      });
    }
    return JSON.stringify({
      code,
      success: true,
      message: "Get book successfully.",
      data: book,
    });
  }

  async create(req, res) {
    const newBook = new Book(req.body);
    const thumbnail = req.body.thumbnail;
    if (validURL(thumbnail) == true) {
      newBook.thumbnail = thumbnail;
    } else if (isBase64(thumbnail, { mimeRequired: true }) == true) {
      const uploadResponse = await cloudinary.uploader.upload(thumbnail, {
        resource_type: "image",
      });
      newBook.thumbnail = uploadResponse.url;
    }
    newBook.save();
    return JSON.stringify({
      code: res.statusCode,
      success: true,
      message: "Create book successfully.",
      data: newBook,
    });
  }

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

    book.name = req.body.name;
    book.author = req.body.author;
    book.categoryId = req.body.categoryId;
    book.isVip = req.body.isVip;
    book.prices = req.body.prices;
    book.description = req.body.description;
    book.channel = req.body.channel;

    const thumbnail = req.body.thumbnail;
    if (validURL(thumbnail) == true) {
      book.thumbnail = thumbnail;
    } else if (isBase64(thumbnail, { mimeRequired: true }) == true) {
      const uploadResponse = await cloudinary.uploader.upload(thumbnail, {
        resource_type: "image",
      });
      book.thumbnail = uploadResponse.url;
    }

    book.save();
    return JSON.stringify({
      code: res.statusCode,
      success: true,
      message: "Update book successfully.",
      data: book,
    });
  }

  async delete(bookId, code) {
    const book = await Book.findById(bookId);
    if (!book) {
      return JSON.stringify({
        code,
        success: false,
        message: "Book not found.",
      });
    }
    book.remove();
    return JSON.stringify({
      code,
      success: true,
      message: "Delete book successfully.",
    });
  }
};
