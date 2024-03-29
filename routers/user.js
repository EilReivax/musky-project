const User = require("../models/user");
const Task = require("../models/task");

module.exports = {
    createOne: async function (req, res) {
        User.register(new User(
            { 
                username: req.body.username,
                startDate: new Date(),
                lastLogin: new Date()
            }
        ), 
        req.body.password,
        (error, user) => {
            if (error) {
                console.log(error)
                req.flash('error', error.message);
                res.redirect('/register');
            } else {
                res.redirect('/dashboard');
            }
        });
    },

    updateOne: async function (req, res) {
        try {
            await User.findByIdAndUpdate(
                req.params.id, 
                {
                    username: req.body.username,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin
                }
            );
        } catch (error) {
            res.status(400).json({ error: error });
        }

        res.redirect('/dashboard');
    },

    deleteOne: async function (req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            await Task.updateMany(
                { userList: { $in: [req.params.id] }},
                { $pull: { userList: req.params.id }}
            );
        } catch (error) {
            res.status(400).json({ error: error });
        }
        
        res.redirect('/dashboard');
    }
}