const AudioService = require('../../applicationCore/services/audio.service');
class AudioController {
    // [GET] /books/:bookId/audios
    async findAllAudio(req, res) {
        const audioService = new AudioService();
        const bookId = req.params.bookId;
        const pageSize = req.query.pageSize;
        const pageNum = req.query.pageNum;
        return res.send(await audioService.findAllAudio(bookId, pageSize, pageNum));
    }
    // [GET] /books/:bookId/audios/:audioId
    async findOneAudio(req, res) {
        const audioService = new AudioService();
        const bookId = req.params.bookId;
        const audioId = req.params.audioId;

        return res.send(await audioService.findOneAudio(bookId, audioId));
    }
    // [POST] /books/:bookId/audios
    async createAudio(req, res) {
        const audioService = new AudioService();
        return res.send(await audioService.createAudio(req, res));
    }
    // [PUT] /books/:bookId/audios/:audioId
    async updateAudio(req, res) {
        const audioService = new AudioService();
        return res.send(await audioService.updateAudio(req, res));
    }
    // [DELETE] /books/:bookId/audios/:audioId
    async deleteAudio(req, res) {
        const audioService = new AudioService();
        const bookId = req.params.bookId;
        const audioId = req.params.audioId;

        return res.send(await audioService.deleteAudio(bookId, audioId));
    }
}

module.exports = new AudioController();
