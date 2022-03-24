const indexController = require("../controllers/IndexController");
const usersRouter = require("./users");
const authRouter = require("./auth");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/", indexController.index);
}

module.exports = route;
