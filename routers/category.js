const Category = require('../models/category');
const User = require('../models/user');

module.exports = {
    createOne: async function (req, res) {
        try {
            let category = new Category(req.body);
            await category.save();
        } catch (error) {
            console.log(error);
        }

        res.redirect('/dashboard');
    },

    getAll: async function (req, res) {
        let categories = []
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
        
            users = await User.find().exec();
        } catch (error) {
            console.log(error);
        }

        res.render("index", {categories: categories, users: users, currentUser: req.user});
    },

    updateOne: async function (req, res) {
        try {
            await Category.findByIdAndUpdate(req.params.id, 
            {
                name: req.body.name,
                taskList: req.body.taskList
            });
        } catch (error) {
            console.log(error);
        }

        res.redirect('/dashboard');
    },

    deleteOne: async function (req, res) {
        try {
            await Category.findByIdAndDelete(req.params.id);
        } catch (error) {
            console.log(error);
        }
      
        res.redirect('/dashboard'); 
    }
}