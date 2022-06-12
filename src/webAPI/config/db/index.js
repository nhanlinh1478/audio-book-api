const mongoose = require('mongoose');
const { MONGODB_URL } = require('../env');
mongoose.plugin(require('../../../webAPI/utils/diff-plugin'));

async function connect() {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB connected...');
    } catch (error) {
        console.log('MongoDB connection error...');
        console.log(error);
    }
}

module.exports = { connect };
