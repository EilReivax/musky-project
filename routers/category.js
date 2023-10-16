const Category = require("../models/category");
const User = require("../models/user");

module.exports = {
    createOne: async function (req, res) {
        let category = new Category(req.body);
        await category.save();
        res.redirect('/dashboard');
    },

    getAll: async function (req, res) {
        let categories = await Category.find()
            .populate('taskList')
            .exec();
        
        let users = await User.find().exec();

        res.render("index", {categories: categories, users: users});
    },

    updateOne: async function (req, res) {
        await Category.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            taskList: req.body.taskList
        });
        res.redirect('/dashboard');
    },

    deleteOne: async function (req, res) {
        await Category.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');        
    }
}