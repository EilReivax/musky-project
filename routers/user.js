const User = require("../models/user");

module.exports = {
    createOne: async function (req, res) {
        User.register(new User({username: req.body.username}), req.body.password);
        res.redirect('/dashboard');
    },

    updateOne: async function (req, res) {
        await User.findByIdAndUpdate(
            req.params.id, 
            {
                username: req.body.username,
                password: req.body.password,
                isAdmin: req.body.isAdmin
            }
        )
        res.redirect('/dashboard');
    },

    deleteOne: async function (req, res) {
        let user = req.body;
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');
    }
}