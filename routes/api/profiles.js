const express = require("express");
const profileRouter = express.Router();

// @route  GET api/profiles/test
// @desc   Test profiles route
// @access Public
profileRouter.get("/test", (req, res) => res.json({ msg: "profile router" }));

module.exports = profileRouter;
