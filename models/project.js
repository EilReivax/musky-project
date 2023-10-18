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

projectSchema.methods.hasStartDate = function () {
    if (this.startDate) {
        return true;
    } else {
        return false;
    }
}

projectSchema.methods.hasEndDate = function () {
    if (this.endDate) {
        return true;
    } else {
        return false;
    }
}

module.exports = mongoose.model('Project', projectSchema);