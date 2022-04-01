class IndexController {
  index(req, res) {
    res.send("Hello world!");
  }
}

module.exports = new IndexController();
