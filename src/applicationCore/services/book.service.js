const Book = require('../../applicationData/entities/book');
const { validURL, cloudinaryUploader, loggingEvent } = require('../common/myUltility');
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

        loggingEvent(books, 'READ_MANY', 'BOOK', true, null, null, '', null);

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

        loggingEvent(books, 'READ_MANY', 'BOOK', true, null, null, '', null);

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
            loggingEvent(book, 'READ', 'BOOK', false, slug, null, '404', null);
            return new ServiceResult(false, NOT_FOUND);
        }

        loggingEvent(book, 'READ', 'BOOK', true, book._id, null, '', null);
        return new ServiceResult(true, READ_ONE, { book });
    }

    async findOne(bookId) {
        const book = await Book.findById(bookId).populate('categoryId');
        if (!book) {
            loggingEvent(book, 'READ', 'BOOK', false, bookId, null, '404', null);
            return new ServiceResult(false, NOT_FOUND);
        }
        loggingEvent(book, 'READ', 'BOOK', true, bookId, null, '', null);
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
        loggingEvent(newBook, 'CREATE', 'BOOK', true, newBook._id, null, '', newBook);

        return new ServiceResult(true, CREATE, { newBook });
    }

    async update(req) {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);

        if (!book) {
            loggingEvent(book, 'UPDATE', 'BOOK', false, bookId, null, '404', null);
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
        loggingEvent(book, 'UPDATE', 'BOOK', true, bookId, null, '', null);

        return new ServiceResult(true, UPDATE, { book });
    }

    async delete(bookId) {
        const book = await Book.findById(bookId);
        if (!book) {
            loggingEvent(book, 'DELETE', 'BOOK', false, bookId, null, '404', null);
            return new ServiceResult(false, NOT_FOUND);
        }
        await book.remove();
        loggingEvent(book, 'DELETE', 'BOOK', true, bookId, null, '', null);

        return new ServiceResult(true, DELETE);
    }
};
