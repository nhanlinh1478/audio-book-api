const Audio = require('../../applicationData/entities/audio');
const { validURL, cloudinaryUploader } = require('../common/myUltility');
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

module.exports = class AudioService {
    async findAllAudio(bookId, pageSize, pageNum) {
        const itemsPerPage = (pageSize > 0 && pageSize) || ITEMS_PER_PAGE;
        const currentPage = (pageNum > 0 && pageNum) || 1;
        const maxPages = Math.ceil((await Audio.find({ bookId }).count()) / itemsPerPage);

        const audios = await Audio.find({ bookId })
            .populate('bookId')
            .skip(itemsPerPage * currentPage - itemsPerPage)
            .limit(itemsPerPage);
        return new ServiceResult(true, READ_MANY, {
            pagination: {
                pageNum: Number(currentPage),
                pageSize: Number(itemsPerPage),
                pageCount: Number(maxPages),
            },
            audios,
        });
    }

    async findOneAudio(bookId, audioId) {
        const audio = await Audio.findOne({ bookId, _id: audioId }).populate('bookId');
        if (!audio) {
            return new ServiceResult(false, NOT_FOUND);
        }
        return new ServiceResult(true, READ_ONE, { audio });
    }
    async createAudio(req) {
        const newAudio = new Audio(req.body);

        newAudio.bookId = req.params.bookId;
        const _audio = req.body.url;
        if (validURL(_audio) == true) {
            newAudio.url = _audio;
        } else {
            newAudio.url = await cloudinaryUploader(_audio, 'video');
        }

        await newAudio.save();
        return new ServiceResult(true, CREATE, { newAudio });
    }
    async updateAudio(req) {
        const bookId = req.params.bookId;
        const audioId = req.params.audioId;
        const audio = await Audio.findOne({ bookId, _id: audioId });

        if (!audio) {
            return new ServiceResult(false, NOT_FOUND);
        }

        audio.name = req.body.name;

        const _audio = req.body.url;
        if (validURL(_audio) == true) {
            audio.url = _audio;
        } else {
            audio.url = await cloudinaryUploader(_audio, 'video');
        }

        await audio.save();
        return new ServiceResult(true, UPDATE, { audio });
    }
    async deleteAudio(bookId, audioId) {
        const audio = await Audio.findOne({ bookId, _id: audioId });
        if (!audio) {
            return new ServiceResult(false, NOT_FOUND);
        }
        await audio.remove();
        return new ServiceResult(true, DELETE);
    }
};
