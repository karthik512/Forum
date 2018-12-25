const bcrypt = require('bcrypt');
const _ = require('lodash');

const {mongoose} = require(process.cwd() + '/server/db/mongoose');
const ValidationUtil = require(process.cwd() + '/common/util/validation-util');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        // validate: {
        //     validator: ValidationUtil.isValidEmail,
        //     message: `{VALUE} is not a valid email`
        // }
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

UserSchema.methods.toObject = function() {
    var user = this;
    var userJSON = user.toJSON();
    return _.omit(userJSON, ['password', 'tokens']);
}

UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else { next(); }
});

let User = mongoose.model('Users', UserSchema);

module.exports = {User};