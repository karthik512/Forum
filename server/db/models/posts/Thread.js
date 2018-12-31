let { mongoose, MongooseSchema } = require(process.cwd() + '/server/db/mongoose');

let ThreadSchema = new MongooseSchema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    subject: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true
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
    keywords: {
        type: Array,
        required: false
    },
    meta: [{
        upvotes: {
            type: Number,
            default: 0
        },
        downvotes: {
            type: Number,
            default:  0
        },
        favs: {
            type: Number,
            default: 0
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

let Thread = mongoose.model('Thread', ThreadSchema);

module.exports = {Thread};