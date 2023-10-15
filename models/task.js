const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        default: 0,
        min: 0,
        max: 3
    },
    progress: {
        type: Number,
        default: 0
    }
});

// Methods
taskSchema.methods.getDueDate = function () {
    return this._dueDate.toLocaleDateString();
}

taskSchema.methods.getPriority = function () {
    switch (this._priority) {
        case 1:
            return "Low";
        case 2:
            return "Medium";
        case 3:
            return "High";
        default:
            return "No Priority";
    }
}

taskSchema.methods.getProgress = function () {
    return Math.round(this._progress * 100);
}

module.exports = mongoose.model('Task', taskSchema);