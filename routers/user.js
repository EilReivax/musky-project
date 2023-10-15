const User = require("./models/user");

module.exports = {
    createOne: async function (req, res) {
        let user = new User(req.body);
        await user.save();
        res.redirect('/');
    },

    updateOne: async function (req, res) {
        let user = req.body;
        await User.findByIdAndUpdate(
            user._id, 
            {
                username: user.username,
                password: user.password,
                isAdmin: user.isAdmin
            }
        )
        res.redirect('/');
    },

    deleteOne: async function (req, res) {
        let user = req.body;
        await User.findByIdAndDelete(user._id);
        res.redirect('/');
    }
}