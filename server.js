// get dependencies
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

// get routers
const userRouter = require("./routes/api/users");
const profileRouter = require("./routes/api/profiles");
const projectRouter = require("./routes/api/projects");
const postRouter = require("./routes/api/posts");

// initialize and configure app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// if not in production, load .env file and dev logging
// if (process.env.NODE_ENV !== "production") {
//   console.log("loading env");
//   require("dotenv").config();
//   const morgan = require("morgan");
//   app.use(morgan("dev"));
// }

// connect to MongoDB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

// app routes
app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/projects", projectRouter);
app.use("/api/posts", postRouter);

// SERVE STATIC ASSETS IF IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// set server port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server now listening on port ${PORT}`));
