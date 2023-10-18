const Project = require('../models/project');
const Category = require('../models/category');
const Task = require('../models/task');
const User = require('../models/user');

const PROJECT_ID = 'PROJECT_ID';

module.exports = {
    login: async function (req, res) {
        if (!await Project.findById(PROJECT_ID)) {
            let newProject = new Project({ 
                _id: PROJECT_ID,
                startDate: new Date(),
                lastLogin: new Date(),
                endDate: new Date()
            });
            await newProject.save();
        }
        
        if (!await User.findOne({ username: 'admin' })) {
            User.register(new User(
                { 
                    username: 'admin',
                    startDate: new Date(),
                    lastLogin: new Date(),
                    isAdmin: true 
                }), 
                'admin'
            );
        }

        res.render('login', { message: req.flash('error') });
    },

    logout: async function (req, res) {
        let loginDate = req.user.lastLogin;
        let logoutDate = new Date();
        let totalHours = (logoutDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60)

        await User.findByIdAndUpdate(req.user._id, { 
            lastLogin: logoutDate,
            $inc : { totalHours: totalHours}
        })

        req.logout((error) => {
            if (error) {
                res.status(400).json({ error: error });
            }
            res.redirect('/');
        });
    },

    updateOne: async function (req, res) {
        try {
            await Project.findByIdAndUpdate(
                PROJECT_ID,
                {
                    startDate: req.body.startDate,
                    endDate: req.body.endDate
                }
            );
        } catch (error) {
            res.status(400).json({ error: error });
        }

        res.redirect('/dashboard');
    },

    getAll: async function (req, res) {
        let project = {};
        let categories = [];
        let tasks = [];
        let users = [];

        try {
            project = await Project.findById(PROJECT_ID);

            if (!await Category.findOne()) {
                let toDo = new Category({ title: 'To-do' });
                let doing = new Category({ title: 'Doing' });
                let done = new Category({ title: 'Done' });

                await toDo.save();
                await doing.save();
                await done.save();
            }

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

            for (let i = 0; i < categories.length; i++) {
                categories[i].taskList.sort((a, b) => a.progress - b.progress);
            }

            tasks = await Task.find()
            .populate('userList')
            .exec();

            users = await User.find()
            .exec();

            await User.findByIdAndUpdate(
                req.user._id,
                {
                    lastLogin: new Date()
                }
            )
        } catch (error) {
            res.status(400).json({ error: error });
        }

        res.render("index", {
            project: project, 
            categories: categories, 
            tasks: tasks, 
            users: users, 
            currentUser: req.user,
            countTasks: await Task.countDocuments(),
            countTasksCompleted: await Task.countDocuments({ progress: 1 })
        });
    }
}