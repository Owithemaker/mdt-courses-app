const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const courses = require("./routes/api/courses");

app.use("/api/courses/", courses);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
