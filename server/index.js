const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");

const app = express();

mongoose.connect("mongodb://dare:abc123@ds147228.mlab.com:47228/courses-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// Middleware
app.use(express.json());
app.use(cors());

const courses = require("./routes/api/courses");

app.use("/api/courses/", courses);

app.post("/signup", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "email in use, login instead",
      });
    }
    return res.status(200).json({
      title: "Signup success",
    });
  });
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    }
    if (!user) {
      return res.status(401).json({
        title: "user not found",
        error: "Invalid credentials",
      });
    }
    // Incorrect password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "login error",
        error: "Invalid credentials",
      });
    }
    // All is good create a token
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      title: "login",
      token,
    });
  });
});

app.get("/user", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });

    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      console.log(user);
      return res.status(200).json({
        title: "user grabbed",
        user: {
          name: user.name,
        },
      });
    });
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
