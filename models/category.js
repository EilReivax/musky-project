const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    taskList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

module.exports = mongoose.model('Category', categorySchema);