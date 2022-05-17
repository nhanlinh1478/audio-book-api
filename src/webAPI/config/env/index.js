const process = require('process');
module.exports = {
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    GMAIL: {
        email: process.env.GMAIL_EMAIL,
        password: process.env.GMAIL_PASSWORD,
    },
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};
