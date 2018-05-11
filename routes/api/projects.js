const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const projectRouter = express.Router();

// get validation
const validateProjectInput = require("../../validation/project");

// get models
const Project = require("../../models/Project");
const User = require("../../models/User");

// @route  GET api/projects/test
// @desc   Test projects route
// @access Public
projectRouter.get("/test", (req, res) => res.json({ msg: "Project Router" }));

// @route  GET api/projects
// @desc   Get all projects for current user
// @access Private
projectRouter.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Project.find({ owner: req.user.id })
			.populate("members", ["name", "email"])
			.then(projects => res.json(projects));
	}
);

// @route  GET api/projects/member
// @desc   Get all projects the current user is a member of
// @access Private
projectRouter.get(
	"/member",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};
		Project.find()
			.populate("owner", ["name", "email"])
			.populate("members", ["name", "email"])
			.then(projects => {
				if (!projects) {
					errors.project = "No projects found.";
					return res.status(404).json(errors);
				}
				const myProjects = [];
				projects.forEach(project => {
					project.members.forEach(member => {
						console.log(member.id === req.user.id);
						if (member.id === req.user.id) {
							myProjects.push(project);
						}
					});
				});
				res.json(myProjects);
			});
	}
);

// @route  GET api/projects/all
// @desc   Get all public projects
// @access Public
projectRouter.get("/all", (req, res) => {
	const errors = {};
	Project.find({ private: false })
		.populate("owner", ["name", "email"])
		.populate("members", ["name", "email"])
		.then(projects => {
			if (!projects) {
				errors.project = "No projects found.";
				return res.status(404).json(errors);
			}
			res.json(projects);
		})
		.catch(err => res.status(400).json(err));
});

// @route  POST api/projects
// @desc   Create a project
// @access Private
projectRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProjectInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const projectFields = {};
		projectFields.owner = req.user.id;
		projectFields.name = req.body.name;
		Project.findOne({ owner: req.user.id, name: projectFields.name }).then(
			project => {
				if (project) {
					errors.project = "You already own a project with that name.";
					return res.status(400).json(errors);
				}
				new Project(projectFields).save().then(project => res.json(project));
			}
		);
	}
);

// @route  POST api/projects/:prj_id
// @desc   Update a project
// @access Private
projectRouter.post(
	"/:prj_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProjectInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const projectFields = {};
		projectFields.name = req.body.name;
		Project.findOne({ owner: req.user.id, _id: req.params.prj_id }).then(
			project => {
				if (!project) {
					errors.project = "Project not found.";
					return res.status(400).json(errors);
				}
				Project.findOneAndUpdate(
					{ owner: req.user.id, _id: req.params.prj_id },
					{ $set: projectFields },
					{ new: true }
				).then(project => res.json(project));
			}
		);
	}
);

// @route  POST api/projects/:prj_id/members
// @desc   Add a member to a project by email address
// @access Private
projectRouter.post(
	"/:prj_id/members",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};
		Project.findOne({ owner: req.user.id, _id: req.params.prj_id }).then(
			project => {
				if (!project) {
					errors.project = "Project not found.";
					return res.status(400).json(errors);
				}
				User.findOne({ email: req.body.email }).then(user => {
					if (!user) {
						errors.user = "User not found.";
						return res.status(400).json(errors);
					}
					if (project.members.indexOf(user.id) > -1) {
						errors.user = "That user is already a member of this project.";
						return res.status(400).json(errors);
					}
					project.members.push(user.id);
					project.save().then(project => res.json(project));
				});
			}
		);
	}
);

// @route  DELETE api/projects/:prj_id/members
// @desc   Remove a member to a project by email
// @access Private
projectRouter.delete(
	"/:prj_id/members",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};
		Project.findOne({ owner: req.user.id, _id: req.params.prj_id }).then(
			project => {
				if (!project) {
					errors.project = "Project not found.";
					return res.status(400).json(errors);
				}
				User.findOne({ email: req.body.email }).then(user => {
					if (!user) {
						errors.user = "User not found.";
						return res.status(400).json(errors);
					}
					const removeIndex = project.members.indexOf(user.id);
					if (removeIndex > -1) {
						project.members.splice(removeIndex, 1);
						project.save().then(project => res.json(project));
					} else {
						errors.user = "That user is not a member of this project.";
						return res.status(400).json(errors);
					}
				});
			}
		);
	}
);

module.exports = projectRouter;
