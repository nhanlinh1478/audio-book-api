const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const LogSchema = new Schema(
    {
        action: { type: String, required: true },
        entity: { type: String, required: true },
        find: { type: String, default: null },
        createdBy: { type: ObjectId, ref: 'User', default: null },
        status: { type: Boolean, default: true },
        message: { type: String, default: null },
        diff: { type: Schema.Types.Mixed },
        create: { type: Object, default: null },
    },
    {
        timestamps: true,
    },
);

// LogSchema.index({ action: 1, entity: 1 });

module.exports = mongoose.model('Log', LogSchema);
