const express = require("express");
const userRouter = express.Router();

// @route  GET api/users/test
// @desc   Test users route
// @access Public
userRouter.get("/test", (req, res) => res.json({ msg: "user router" }));

module.exports = userRouter;
