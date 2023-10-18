const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    _id: String,
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Project', projectSchema);