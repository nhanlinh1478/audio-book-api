const Book = require('../../applicationData/entities/book');
const { validURL, cloudinaryUploader } = require('../common/myUltility');
const ServiceResult = require('../common/serviceResult');
const {
    NOT_FOUND,
    READ_ONE,
    READ_MANY,
    CREATE,
    UPDATE,
    DELETE,
    ITEMS_PER_PAGE,
} = require('../common/applicationConstant');

module.exports = class BookService {
    async findAll(pageSize, pageNum) {
        const itemsPerPage = (pageSize > 0 && pageSize) || ITEMS_PER_PAGE;
        const currentPage = (pageNum > 0 && pageNum) || 1;
        const maxPages = Math.ceil((await Book.count()) / itemsPerPage);

        const books = await Book.find()
            .populate('categoryId')
            .skip(itemsPerPage * currentPage - itemsPerPage)
            .limit(itemsPerPage);
        return new ServiceResult(true, READ_MANY, {
            pagination: {
                pageNum: Number(currentPage),
                pageSize: Number(itemsPerPage),
                pageCount: Number(maxPages),
            },
            books,
        });
    }
    async findAllBookInCategory(categoryId, pageSize, pageNum) {
        const itemsPerPage = (pageSize > 0 && pageSize) || ITEMS_PER_PAGE;
        const currentPage = (pageNum > 0 && pageNum) || 1;
        const maxPages = Math.ceil((await Book.find({ categoryId }).count()) / itemsPerPage);

        const books = await Book.find({ categoryId })
            .populate('categoryId')
            .skip(itemsPerPage * currentPage - itemsPerPage)
            .limit(itemsPerPage);
        return new ServiceResult(true, READ_MANY, {
            pagination: {
                pageNum: Number(currentPage),
                pageSize: Number(itemsPerPage),
                pageCount: Number(maxPages),
            },
            books,
        });
    }

    async findOneBySlug(slug) {
        const book = await Book.findOne({ slug }).populate('categoryId');
        if (!book) {
            return new ServiceResult(false, NOT_FOUND);
        }
        return new ServiceResult(true, READ_ONE, { book });
    }
    async findOne(bookId) {
        const book = await Book.findById(bookId).populate('categoryId');
        if (!book) {
            return new ServiceResult(false, NOT_FOUND);
        }
        return new ServiceResult(true, READ_ONE, { book });
    }

    async create(req) {
        const newBook = new Book(req.body);
        const thumbnail = req.body.thumbnail;
        if (validURL(thumbnail) == true) {
            newBook.thumbnail = thumbnail;
        } else {
            newBook.thumbnail = await cloudinaryUploader(thumbnail, 'image');
        }
        await newBook.save();
        return new ServiceResult(true, CREATE, { newBook });
    }

    async update(req) {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);

        if (!book) {
            return new ServiceResult(false, NOT_FOUND);
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
        } else {
            book.thumbnail = await cloudinaryUploader(thumbnail, 'image');
        }

        await book.save();
        return new ServiceResult(true, UPDATE, { book });
    }

    async delete(bookId) {
        const book = await Book.findById(bookId);
        if (!book) {
            return new ServiceResult(false, NOT_FOUND);
        }
        await book.remove();
        return new ServiceResult(true, DELETE);
    }
};
