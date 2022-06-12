const Book = require('../../applicationData/entities/book');
const LogSchema = require('../../applicationData/entities/log');
const schedule = require('node-schedule');

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

function job() {
    return schedule.scheduleJob('*/1 * * * *', async function () {
        const books = await Book.find();
        const date = new Date();
        console.log('Now is ' + date.toLocaleString());
        books.map(async (book) => {
            const logs = await LogSchema.find({ action: 'READ', entity: 'BOOK', find: book._id });
            book.views = logs.length;
            book.save();

        });
        // console.log(book.name, logs.length);
    });
}

module.exports = { job };
