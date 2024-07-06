const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const uniqueValidator = require('mongoose-unique-validator'); // can be used to validate unique fields


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
    // friends: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // }]
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
        error.message = { msg: "user already exists", is_email_verified: existingUser.is_email_verified };
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

userSchema.methods.comparePassword = function (password) {
    if (!password) {
        const error = new Error();
        error.status = 404;
        error.message = "Password field is empty";
        throw error;
    }
    // If password is not set then a new password is required to be set for this user
    if (!this.password) {
        const error = new Error();
        error.status = 400;
        error.message = "Password not set";
        throw error;
    }
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;