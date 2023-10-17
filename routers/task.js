const Task = require("../models/task");
const Category = require("../models/category");

module.exports = {
    createOne: async function (req, res) {
        try {
            let task = new Task(req.body);
            await task.save();
    
            await Category.findByIdAndUpdate(req.params.id, { $push: { taskList: task._id }})
        } catch (error) {
            res.status(400).json({ error: error });
        }

        res.redirect('/dashboard');
    },

    updateOne: async function (req, res) {
        try {
            let task = await Task.findByIdAndUpdate(
                req.params.id, 
                {
                    title: req.body.title,
                    description: req.body.description,
                    dueDate: req.body.dueDate,
                    priority: parseInt(req.body.priority),
                    progress: req.body.progress,
                    completedDate: req.body.completedDate,
                    userList: req.body.userList
                },
                { new: true }
            )
            await task.isCompleted();
            await task.save();
        } catch (error) {
            res.status(400).json({ error: error });
        }

        res.redirect('/dashboard');
    },

    deleteOne: async function (req, res) {
        try {
            await Task.findByIdAndDelete(req.params.id);
            await Category.updateMany(
                { taskList: { $in: [req.params.id] }}, 
                { $pull: { taskList: req.params.id }}
            );
        } catch (error) {
            res.status(400).json({ error: error });
        }
        
        res.redirect('/dashboard');
    }
}