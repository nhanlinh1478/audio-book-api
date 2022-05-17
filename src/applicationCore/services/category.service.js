const Category = require('../../applicationData/entities/category');
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

module.exports = class CategoryService {
    async findAll(pageSize, pageNum) {
        const itemsPerPage = (pageSize > 0 && pageSize) || ITEMS_PER_PAGE;
        const currentPage = (pageNum > 0 && pageNum) || 1;
        const maxPages = Math.ceil((await Category.count()) / itemsPerPage);

        const categories = await Category.find()
            .skip(itemsPerPage * currentPage - itemsPerPage)
            .limit(itemsPerPage);
        return new ServiceResult(true, READ_MANY, {
            pagination: {
                pageNum: Number(currentPage),
                pageSize: Number(itemsPerPage),
                pageCount: Number(maxPages),
            },
            categories,
        });
    }
    async findOne(categoryId) {
        const category = await Category.findById(categoryId);
        if (!category) {
            return new ServiceResult(false, NOT_FOUND);
        }
        return new ServiceResult(true, READ_ONE, { category });
    }
    async create(name, description) {
        const category = new Category({
            name,
            description,
        });
        await category.save();
        return new ServiceResult(true, CREATE, { category });
    }
    async update(categoryId, name, description) {
        const category = await Category.findById(categoryId);
        if (!category) {
            return new ServiceResult(false, NOT_FOUND);
        }

        category.name = name;
        category.description = description;
        await category.save();
        return new ServiceResult(true, UPDATE, { category });
    }
    async delete(categoryId) {
        const category = await Category.findById(categoryId);
        if (!category) {
            return new ServiceResult(false, NOT_FOUND);
        }
        await category.remove();
        return new ServiceResult(true, DELETE);
    }
};
