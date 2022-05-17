const BookService = require('../../applicationCore/services/book.service');

class BookController {
    // [GET] /books
    async findAll(req, res) {
        const bookService = new BookService();
        const pageSize = req.query.pageSize;
        const pageNum = req.query.pageNum;
        return res.send(await bookService.findAll(pageSize, pageNum));
    }
    // [GET] /books/category/:categoryId
    async findAllBookInCategory(req, res) {
        const bookService = new BookService();
        const categoryId = req.params.categoryId;
        const pageSize = req.query.pageSize;
        const pageNum = req.query.pageNum;
        return res.send(await bookService.findAllBookInCategory(categoryId, pageSize, pageNum));
    }
    // [GET] /books/slug/:slug
    async findOneBySlug(req, res) {
        const bookService = new BookService();
        const slug = req.params.slug;
        return res.send(await bookService.findOneBySlug(slug));
    }
    // [GET] /books/:bookId
    async findOne(req, res) {
        const bookService = new BookService();
        const bookId = req.params.bookId;
        return res.send(await bookService.findOne(bookId));
    }
    // [POST] /books
    async create(req, res) {
        const bookService = new BookService();
        return res.send(await bookService.create(req, res));
    }
    // [PUT] /books/:bookId
    async update(req, res) {
        const bookService = new BookService();
        return res.send(await bookService.update(req, res));
    }
    // [DELETE] /books/:bookId
    async delete(req, res) {
        const bookService = new BookService();
        const bookId = req.params.bookId;
        return res.send(await bookService.delete(bookId));
    }
}
module.exports = new BookController();
