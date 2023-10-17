const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    _id: String,
    startDate: Date,
    endDate: Date,
    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    taskList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    userList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Project', projectSchema);