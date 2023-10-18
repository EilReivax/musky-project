const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    _id: String,
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Project', projectSchema);