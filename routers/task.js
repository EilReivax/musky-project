const Task = require("./models/task");

module.exports = {
    createOne: async function (req, res) {
        let task = new Task(req.body).save();
        await task.save();
        res.redirect('/');
    },

    getAll: async function (req, res) {
        let tasks = await Task.find().exec();
        return tasks;
    },

    updateOne: async function (req, res) {
        let task = req.body;
        await Task.findByIdAndUpdate(
            task._id, 
            {
                title: task.name,
                description: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                progress: task.progress
            }
        );
        res.redirect('/');
    },

    deleteOne: async function (req, res) {
        let task = req.body;
        await Task.findByIdAndDelete(task._id);
        res.redirect('/');
    }
}