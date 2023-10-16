const Task = require("../models/task");
const Category = require("../models/category");

module.exports = {
    createOne: async function (req, res) {
        let task = new Task(req.body);
        await task.save();

        await Category.findByIdAndUpdate(req.params.id, { $push: {taskList: task._id} })

        res.redirect('/dashboard');
    },

    getAll: async function (req, res) {
        let tasks = await Task.find()
        .populate('userList')
        .exec();
        return tasks;
    },

    updateOne: async function (req, res) {
        await Task.findByIdAndUpdate(
            req.params.id, 
            {
                title: req.body.name,
                description: req.body.description,
                dueDate: req.body.dueDate,
                priority: parseInt(req.body.priority),
                progress: req.body.progress,
                userList: req.body.userList
            }
        );
        res.redirect('/dashboard');
    },

    deleteOne: async function (req, res) {
        await Task.findByIdAndDelete(req.params.id);
        await Category.updateMany(
            { taskList: { $in: [req.params.id] } }, 
            { $pull: { taskList: req.params.id } }
        );
        res.redirect('/dashboard');
    }
}