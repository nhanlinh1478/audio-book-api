const Audio = require("../models/Audio");
const { cloudinary } = require("../utils/cloundinary");
const { validURL } = require("../utils/helper");

module.exports = class AudioAction {
  async findAllAudio(bookId, code) {
    const audios = await Audio.find({ bookId }).populate("bookId");
    return JSON.stringify({
      code,
      success: true,
      message: "Get audio list successfully.",
      data: audios,
    });
  }

  async findOneAudio(bookId, audioId, code) {
    const audio = await Audio.findOne({ bookId, _id: audioId }).populate(
      "bookId"
    );
    if (!audio) {
      return JSON.stringify({
        code,
        success: false,
        message: "Audio not found.",
      });
    }
    return JSON.stringify({
      code,
      success: true,
      message: "Get audio successfully.",
      data: audio,
    });
  }
  async createAudio(req, res) {
    const newAudio = new Audio(req.body);

    newAudio.bookId = req.params.bookId;
    const _audio = req.body.url;
    if (validURL(_audio) == true) {
      newAudio.url = _audio;
    } else {
      const uploadResponse = await cloudinary.uploader.upload(_audio, {
        resource_type: "video",
      });
      newAudio.url = uploadResponse.url;
    }

    newAudio.save();
    return JSON.stringify({
      code: res.statusCode,
      success: true,
      message: "Create audio successfully.",
      data: newAudio,
    });
  }
  async updateAudio(req, res) {
    const bookId = req.params.bookId;
    const audioId = req.params.audioId;
    const audio = await Audio.findOne({ bookId, _id: audioId });

    if (!audio) {
      return JSON.stringify({
        code: res.statusCode,
        success: false,
        message: "Audio not found.",
      });
    }

    audio.name = req.body.name;

    const _audio = req.body.url;
    if (validURL(_audio) == true) {
      audio.url = _audio;
    } else {
      const uploadResponse = await cloudinary.uploader.upload(_audio, {
        resource_type: "video",
      });
      audio.url = uploadResponse.url;
    }

    audio.save();
    return JSON.stringify({
      code: res.statusCode,
      success: true,
      message: "Update audio successfully.",
      data: audio,
    });
  }
  async deleteAudio(bookId, audioId, code) {
    const audio = await Audio.findOne({ bookId, _id: audioId });
    if (!audio) {
      return JSON.stringify({
        code,
        success: false,
        message: "Audio not found.",
      });
    }
    audio.remove();
    return JSON.stringify({
      code,
      success: true,
      message: "Delete audio successfully.",
    });
  }
};
