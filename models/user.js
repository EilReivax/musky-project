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
        type: Number,
        default: 0
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
    return Math.rount(this.totalHours / totalDays() * 10) / 10;
}

function totalDays() {
    (this.lastLogin.getTime() - this.startDate.getTime()) / 1000 * 60 * 60 * 24
}

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);