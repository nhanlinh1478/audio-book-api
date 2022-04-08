const BookAction = require("../actions/BookAction");

class BookController {
  async findAll(req, res) {
    const bookAction = new BookAction();
    const code = res.statusCode;
    return res.send(await bookAction.findAll(code));
  }
  async findOne(req, res) {
    const bookAction = new BookAction();
    const bookId = req.params.bookId;
    const code = res.statusCode;
    return res.send(await bookAction.findOne(bookId, code));
  }
  async create(req, res) {
    const bookAction = new BookAction();
    return res.send(await bookAction.create(req, res));
  }
}
module.exports = new BookController();
