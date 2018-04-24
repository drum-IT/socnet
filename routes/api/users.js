// get dependencies and create express router
const bcrypt = require("bcryptjs");
const express = require("express");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const userRouter = express.Router();

// get the user model
const User = require("../../models/User");

// @route  GET api/users/test
// @desc   Test users route
// @access Public
userRouter.get("/test", (req, res) => res.json({ msg: "user router" }));

// @route  POST api/users/register
// @desc   Register a new user account
// @access Public
userRouter.post("/register", (req, res) => {
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email Already Exists" });
		}
		const avatar = gravatar.url(req.body.email, {
			s: "200", // size
			r: "pg", // rating
			d: "mm" // default
		});
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			avatar,
			password: req.body.password
		});
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser
					.save()
					.then(user => res.json(user))
					.catch(err => console.log(err));
			});
		});
	});
});

// @route  POST api/users/login
// @desc   Login a user / return JWT token
// @access Public
userRouter.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email }).then(user => {
		if (!user) {
			return res.status(404).json({ email: "User not found." });
		}
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({ success: true, token: `Bearer ${token}` });
					}
				);
			} else {
				return res.status(400).json({ password: "Password incorrect" });
			}
		});
	});
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private
userRouter.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email
		});
	}
);

module.exports = userRouter;
