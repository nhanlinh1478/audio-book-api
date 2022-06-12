const AudioService = require('../../applicationCore/services/audio.service');
class AudioCommandController {
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

module.exports = new AudioCommandController();
