const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: null
    },
    totalHours: {
        type: mongoose.Decimal128,
        default: 0.0
    },
    lastLogin: {
        type: Date,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.averageHours = function () {
    return Math.round(this.totalHours / (this.lastLogin.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24) * 10) / 10;
}

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);