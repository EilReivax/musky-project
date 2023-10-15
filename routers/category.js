const Category = require("./models/category");

module.exports = {
    createOne: async function (req, res) {
        let category = new Category(req.body);
        await category.save();
        res.redirect('/');
    },

    getAll: async function (req, res) {
        let categories = await Category.find()
            .populate('taskList')
            .exec();

        return categories;
    },

    updateOne: async function (req, res) {
        let category = req.body;
        await Category.findByIdAndUpdate(category._id, 
        {
            name: category.name,
            taskList: category.taskList
        });
        res.redirect('/');
    },

    deleteOne: async function (req, res) {
        let category = req.body;
        await Category.findByIdAndDelete(category._id);
        res.redirect('/');        
    }
}