const AudioAction = require("../actions/AudioAction");
class AudioController {
  // [GET] /books/:bookId/audios
  async findAllAudio(req, res) {
    const audioAction = new AudioAction();
    const bookId = req.params.bookId;
    const code = res.statusCode;
    return res.send(await audioAction.findAllAudio(bookId, code));
  }
  // [GET] /books/:bookId/audios/:audioId
  async findOneAudio(req, res) {
    const audioAction = new AudioAction();
    const bookId = req.params.bookId;
    const audioId = req.params.audioId;
    const code = res.statusCode;
    return res.send(await audioAction.findOneAudio(bookId, audioId, code));
  }
  // [POST] /books/:bookId/audios
  async createAudio(req, res) {
    const audioAction = new AudioAction();
    return res.send(await audioAction.createAudio(req, res));
  }
  // [PUT] /books/:bookId/audios/:audioId
  async updateAudio(req, res) {
    const audioAction = new AudioAction();
    return res.send(await audioAction.updateAudio(req, res));
  }
  // [DELETE] /books/:bookId/audios/:audioId
  async deleteAudio(req, res) {
    const audioAction = new AudioAction();
    const bookId = req.params.bookId;
    const audioId = req.params.audioId;
    const code = res.statusCode;
    return res.send(await audioAction.deleteAudio(bookId, audioId, code));
  }
}

module.exports = new AudioController();
