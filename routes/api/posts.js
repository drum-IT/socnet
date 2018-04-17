const express = require("express");
const postRouter = express.Router();

// @route  GET api/posts/test
// @desc   Test posts route
// @access Public
postRouter.get("/test", (req, res) => res.json({ msg: "post router" }));

module.exports = postRouter;
