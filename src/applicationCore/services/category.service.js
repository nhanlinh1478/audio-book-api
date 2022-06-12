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
const { loggingEvent } = require('../common/myUltility');

module.exports = class CategoryService {
    async findAll(pageSize, pageNum) {
        const itemsPerPage = (pageSize > 0 && pageSize) || ITEMS_PER_PAGE;
        const currentPage = (pageNum > 0 && pageNum) || 1;
        const maxPages = Math.ceil((await Category.count()) / itemsPerPage);

        const categories = await Category.find()
            .skip(itemsPerPage * currentPage - itemsPerPage)
            .limit(itemsPerPage);

        loggingEvent(categories, 'READ_MANY', 'CATEGORY', true, null, null, '', null);

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
            loggingEvent(category, 'READ', 'CATEGORY', false, categoryId, null, '404', null);

            return new ServiceResult(false, NOT_FOUND);
        }
        loggingEvent(category, 'READ', 'CATEGORY', true, categoryId, null, '', null);
        return new ServiceResult(true, READ_ONE, { category });
    }
    async create(name, description) {
        const category = new Category({
            name,
            description,
        });
        await category.save();
        loggingEvent(category, 'CREATE', 'CATEGORY', true, category._id, null, '', category);

        return new ServiceResult(true, CREATE, { category });
    }
    async update(categoryId, name, description) {
        const category = await Category.findById(categoryId);
        if (!category) {
            loggingEvent(category, 'UPDATE', 'CATEGORY', false, categoryId, null, '404', null);

            return new ServiceResult(false, NOT_FOUND);
        }

        category.name = name;
        category.description = description;
        await category.save();

        loggingEvent(category, 'UPDATE', 'CATEGORY', true, categoryId, null, '', null);

        return new ServiceResult(true, UPDATE, { category });
    }
    async delete(categoryId) {
        const category = await Category.findById(categoryId);
        if (!category) {
            loggingEvent(category, 'DELETE', 'CATEGORY', false, categoryId, null, '404', null);

            return new ServiceResult(false, NOT_FOUND);
        }
        await category.remove();
        loggingEvent(category, 'DELETE', 'CATEGORY', true, categoryId, null, '', null);
        return new ServiceResult(true, DELETE);
    }
};
