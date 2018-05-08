const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const projectRouter = express.Router();

// get validation
const validateProjectInput = require("../../validation/project");

const Project = require("../../models/Project");

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
		Project.find({ owner: req.user.id }).then(projects => res.json(projects));
	}
);

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
					errors.project = "No project found.";
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

module.exports = projectRouter;
