const CategoryService = require('../../applicationCore/services/category.service');

class CategoryController {
    // [GET] /categories
    async findAll(req, res) {
        const categoryService = new CategoryService();
        const pageSize = req.query.pageSize;
        const pageNum = req.query.pageNum;
        return res.send(await categoryService.findAll(pageSize, pageNum));
    }

    // [GET] /categories/:categoryId
    async findOne(req, res) {
        const categoryService = new CategoryService();
        const categoryId = req.params.categoryId;

        return res.send(await categoryService.findOne(categoryId));
    }
    // [POST] /categories/
    async create(req, res) {
        const categoryService = new CategoryService();
        const name = req.body.name;
        const description = req.body.description;

        return res.send(await categoryService.create(name, description));
    }
    // [PUT] /categories/:categoryId
    async update(req, res) {
        const categoryService = new CategoryService();
        const categoryId = req.params.categoryId;
        const name = req.body.name;
        const description = req.body.description;

        return res.send(await categoryService.update(categoryId, name, description));
    }
    // [DELETE] /categories/:categoryId
    async delete(req, res) {
        const categoryService = new CategoryService();
        const categoryId = req.params.categoryId;

        return res.send(await categoryService.delete(categoryId));
    }
}
module.exports = new CategoryController();
