let {mongoose} = require(process.cwd() + '/server/db/mongoose');
let {ValidationUtil} = require(process.cwd() + '/common/util/validation-util');


let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: ValidationUtil.isValidEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        access: {
            type: String,   //Can store numbers in the power of 2 with each permission added up
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    is_moderator: { 
        type: Boolean, 
        default: false 
    },
    points: {
        type: Number,
        default: 0
    },
    added_time: {
        type: Date,
        default: Date.now
    },
    updated_time: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = {User};