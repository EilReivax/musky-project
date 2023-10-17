const Category = require('../models/category');
const Task = require('../models/task');
const User = require('../models/user');

module.exports = {
    createOne: async function (req, res) {
        try {
            let category = new Category(req.body);
            await category.save();
        } catch (error) {
            res.status(400).json({ error: error });
        }

        res.redirect('/dashboard');
    },

    getAll: async function (req, res) {
        let categories = []
        let tasks = []
        let users = []

        try {
            categories = await Category.find()
            .populate({
                path: 'taskList',
                model: 'Task',
                populate: {
                    path: 'userList',
                    model: 'User'
                }
            })
            .exec();

            tasks = await Task.find()
            .populate('userList')
            .exec();
            
            users = await User.find().exec();
        } catch (error) {
            res.status(400).json({ error: error });
        }

        res.render("index", {categories: categories, users: users, currentUser: req.user});
    },

    updateOne: async function (req, res) {
        try {
            await Category.findByIdAndUpdate(req.params.id, 
            {
                title: req.body.title,
                taskList: req.body.taskList
            });
        } catch (error) {
            res.status(400).json({ error: error });
        }

        res.redirect('/dashboard');
    },

    deleteOne: async function (req, res) {
        try {
            await Category.findByIdAndDelete(req.params.id);
        } catch (error) {
            res.status(400).json({ error: error });
        }
      
        res.redirect('/dashboard'); 
    }
}