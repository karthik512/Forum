const bcrypt = require('bcrypt');
const _ = require('lodash');

const { mongoose, MongooseSchema } = require(process.cwd() + '/server/db/mongoose');
const ValidationUtil = require(process.cwd() + '/common/util/validation-util');

let UserSchema = new MongooseSchema({
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

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObj = user.toObject();
    return _.omit(userObj, ['password', 'tokens']);
}

UserSchema.statics.findByMail = function(email) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject({
                error: 'User not found'
            });
        } else {
            return Promise.resolve(user);
        }
    });
}

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject({
                error: 'User not found'
            });
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject({
                        error: 'Incorrect Password'
                    });
                }
            });
        });
    });
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