let { mongoose, MongooseSchema } = require(process.cwd() + '/server/db/mongoose');

let ReplySchema = new MongooseSchema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    thread_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{
        user_id: {
            type: mongoose.Schema.ObjectId,
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

let Reply = mongoose.model('Reply', ReplySchema);

module.exports = {Reply};