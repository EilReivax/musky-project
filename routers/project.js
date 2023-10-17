const Project = require('../models/project');

const PROJECT_ID = 'PROJECT_ID';

module.exports = {
    getAll: async function (req, res) {
        let project = {};
        try {
            if (!await Project.findById(PROJECT_ID)) {
                let newProject = new Project({ _id: PROJECT_ID });
                await newProject.save();
            }
            project = await Project.findById({ PROJECT_ID })
            .populate({
                path: 'categoryList',
                model: 'Category',
                populate: {
                    path: 'taskList',
                    model: 'Task',
                    populate: {
                        path: 'userList',
                        model: 'User'
                    }
                }
            })
            .populate({
                path: 'taskList',
                model: 'Task',
                populate: {
                    path: 'userList',
                    model: 'User'
                }
            })
            .populate('userList')
            .execPopulate();
        } catch (error) {
            res.status(400).json({ error: error });
        }

        res.render("index", {project: project, currentUser: req.user});
    },
}