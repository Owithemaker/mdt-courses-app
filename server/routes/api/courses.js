const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Courses
router.get("/", async (req, res) => {
  try {
    const courses = await loadCoursesCollection();
    res.send(await courses.find({}).toArray());
  } catch (error) {
    console.log(error);
  }
});

// Add Course
router.post("/", async (req, res) => {
  try {
    const courses = await loadCoursesCollection();
    await courses.insertOne({
      topic: req.body.topic,
      price: req.body.price,
      location: req.body.location,
      createdAt: new Date(),
    });
    res.status(201).send();
  } catch (error) {
    console.log(error);
  }
});

// Delete Course
router.delete("/:id", async (req, res) => {
  try {
    const courses = await loadCoursesCollection();
    await courses.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

async function loadCoursesCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://dare:abc123@ds147228.mlab.com:47228/courses-app",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  return client.db("courses-app").collection("courses");
}

module.exports = router;
