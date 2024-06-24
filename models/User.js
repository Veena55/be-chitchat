const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    google_id: {
        type: String,
        default: ''
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        default: ''
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

// userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
    const existingUser = await user.findOne({ email: this.email });
    if (existingUser) {
        const error = new Error();
        error.status = 409;
        error.message = 'Email already exists, please try another one.';
        return next(error);
    }
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 5);
    }
    next();
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

const user = mongoose.model('user', userSchema);

module.exports = user;