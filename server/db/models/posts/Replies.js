let {mongoose} = require(process.cwd() + '/server/db/mongoose');

let ReplySchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    thread_id: {
        type: ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{
        user_id: {
            type: ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true,
            maxlength: 200
        },
        added_time: {
            type: Date,
            default: Date.now
        },
        updated_time: {
            type: Date,
            default: Date.now
        }
    }],
    meta: [{
        upvotes: {
            type: Number,
            default: 0
        },
        downvotes: {
            type: Number,
            default:  0
        }
    }],
    added_time: {
        type: Date,
        default: Date.now
    },
    updated_time: {
        type: Date,
        default: Date.now
    }
});

let Reply = mongoose.model('Thread', ReplySchema);

module.exports = {Reply};