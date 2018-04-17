// get dependencies
const express = require("express");
const mongoose = require("mongoose");

// get routers
const userRouter = require("./routes/api/users");
const profileRouter = require("./routes/api/profiles");
const postRouter = require("./routes/api/posts");

// initialize app
const app = express();

// if not in production, load .env file and dev logging
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

// connect to MongoDB
const db = require("./config/keys").mongoURI;
mongoose
	.connect(db)
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

// app routes
app.get("/", (req, res) => res.send("hello"));

app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/posts", postRouter);

// set server port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server now listening on port ${PORT}`));
