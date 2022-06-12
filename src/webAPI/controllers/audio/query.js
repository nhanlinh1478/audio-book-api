const AudioService = require('../../../applicationCore/services/audio.service');
class AudioQueryController {
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
}

module.exports = new AudioQueryController();
