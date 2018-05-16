const express = require("express");
const postRouter = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");

// @route  GET api/posts/test
// @desc   Test posts route
// @access Public
postRouter.get("/test", (req, res) => res.json({ msg: "post router" }));

// @route  GET api/posts
// @desc   Get all posts
// @access Public
postRouter.get("/", (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => {
			if (posts.length < 1) {
				return res.status(404).json({ nopost: "No Posts Found." });
			}
			res.json(posts);
		})
		.catch(err => res.status(404).json({ nopostfound: "No Posts Found." }));
});

// @route  GET api/posts/post_id
// @desc   Get single post by id
// @access Public
postRouter.get("/:post_id", (req, res) => {
	Post.findById(req.params.post_id).then(post => {
		if (!post) {
			return res.status(404).json({ nopost: "No Post Found." });
		}
		res.json(post);
	});
});

// @route  POST api/posts
// @desc   Create a new Post
// @access Private
postRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}
		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});
		newPost.save().then(post => res.json(post));
	}
);

// @route  POST api/posts/comment/post_id
// @desc   Create a new Post
// @access Private
postRouter.post(
	"/comment/:post_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}
		Post.findById(req.params.post_id).then(post => {
			if (!post) {
				errors.nopost = "No post found";
				return res.status(404).json(errors);
			}
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};
			post.comments.unshift(newComment);
			post.save().then(post => res.json(post));
		});
	}
);

// @route  POST api/posts/like/post_id
// @desc   Like post
// @access Private
postRouter.post(
	"/like/:post_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.post_id).then(post => {
			if (!post) {
				return res.status(404).json({ nopost: "No Post Found." });
			}
			if (
				post.likes.filter(like => like.user.toString() === req.user.id).length >
				0
			) {
				return res
					.status(400)
					.json({ like: "You have already liked this post." });
			}
			post.likes.push({ user: req.user.id });
			post.save().then(post => res.json(post));
		});
	}
);

// @route  DELETE api/posts/post_id
// @desc   Delete a post by id
// @access Private
postRouter.delete(
	"/:post_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findOne({ user: req.user.id, _id: req.params.post_id }).then(post => {
			if (!post) {
				return res.status(404).json({ nopost: "No post found." });
			}
			post.remove().then(() => res.json({ success: true }));
		});
	}
);

// @route  DELETE api/posts/comment/:post_id/:comment_id
// @desc   Delete a post by id
// @access Private
postRouter.delete(
	"/comment/:post_id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.post_id).then(post => {
			if (
				post.comments.filter(
					comment => comment._id.toString() === req.params.comment_id
				).length === 0
			) {
				return res.status(404).json({ nocomment: "No comment found" });
			}
			const removeIndex = post.comments
				.map(comment => comment.id.toString())
				.indexOf(req.params.comment_id);

			console.log(post.comments[removeIndex].user);
			if (post.comments[removeIndex].user.toString() !== req.user.id) {
				return res.status(401).json({ notauth: "You are not authorized." });
			}

			post.comments.splice(removeIndex, 1);
			post.save().then(post => res.json(post));
		});
	}
);

// @route  DELETE api/posts/like/post_id
// @desc   Unlike post
// @access Private
postRouter.delete(
	"/like/:post_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.post_id).then(post => {
			if (!post) {
				return res.status(404).json({ nopost: "No Post Found." });
			}
			if (
				post.likes.filter(like => like.user.toString() === req.user.id)
					.length === 0
			) {
				return res
					.status(400)
					.json({ notliked: "You have not liked this post." });
			}
			const removeIndex = post.likes
				.map(like => like.user.toString())
				.indexOf(req.user.id);
			post.likes.splice(removeIndex, 1);
			post.save().then(post => res.json(post));
		});
	}
);

module.exports = postRouter;
