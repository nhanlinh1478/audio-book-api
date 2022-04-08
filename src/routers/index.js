const indexController = require("../controllers/IndexController");
const usersRouter = require("./users");
const authRouter = require("./auth");
const categoriesRouter = require("./categories");
const booksRouter = require("./books");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/categories", categoriesRouter);
  app.use("/books", booksRouter);
  app.use("/users", usersRouter);
  app.use("/", indexController.index);
}

module.exports = route;
