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

    updateOne: async function (req, res) {
        try {
            await Category.findByIdAndUpdate(
                req.params.id, 
                {
                    title: req.body.title
                }
            );
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