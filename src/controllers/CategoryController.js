const CategoryAction = require("../actions/CategoryAction");

class CategoryController {
  // [GET] /categories
  async findAll(req, res) {
    const categoryAction = new CategoryAction();
    const code = res.statusCode;
    return res.send(await categoryAction.findAll(code));
  }

  // [GET] /categories/:categoryId
  async findOne(req, res) {
    const categoryAction = new CategoryAction();
    const categoryId = req.params.categoryId;
    const code = res.statusCode;
    return res.send(await categoryAction.findOne(categoryId, code));
  }
  // [POST] /categories/
  async create(req, res) {
    const categoryAction = new CategoryAction();
    const name = req.body.name;
    const description = req.body.description;
    const code = res.statusCode;
    return res.send(await categoryAction.create(name, description, code));
  }
  // [PUT] /categories/:categoryId
  async update(req, res) {
    const categoryAction = new CategoryAction();
    const categoryId = req.params.categoryId;
    const name = req.body.name;
    const description = req.body.description;
    const code = res.statusCode;
    return res.send(
      await categoryAction.update(categoryId, name, description, code)
    );
  }
  // [DELETE] /categories/:categoryId
  async delete(req, res) {
    const categoryAction = new CategoryAction();
    const categoryId = req.params.categoryId;
    const code = res.statusCode;
    return res.send(await categoryAction.delete(categoryId, code));
  }
}
module.exports = new CategoryController();
