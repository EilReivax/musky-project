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
        type: mongoose.Decimal128,
        default: 0.0
    },
    dateCompleted: {
        type: Date,
        default: null
    },
    userList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
});

// Methods
taskSchema.methods.isCompleted = function () {
    if (this.progress == 1) {
        if (this.dateCompleted == null) {
            this.dateCompleted = new Date();
        }
        return true;
    } else {
        this.dateCompleted = null;
        return false;
    }
}

taskSchema.methods.getPriority = function () {
    switch (this.priority) {
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
    return Math.round(this.progress * 100);
}

module.exports = mongoose.model('Task', taskSchema);