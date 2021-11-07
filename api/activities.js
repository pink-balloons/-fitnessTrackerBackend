const express = require("express");
const {
  createActivity,
  getAllActivities,
  updateActivity,
} = require("../db/activities");
const { requireUser } = require("../db/utils");
const activityRouter = express.Router();

activityRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    if (activities) {
      res.send(activities);
    } else {
      res.send({ message: "No activities found" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

activityRouter.post("/", requireUser, async (req, res, next) => {
  console.log("1");
  try {
    const { name, description } = req.body;
    console.log("2");

    if (name && description) {
      const createdActivity = await createActivity({ name, description });
      res.send(createdActivity);
    } else {
      res.send({ message: "Missing fields" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

activityRouter.patch("/:activityId", async (req, res, next) => {
  console.log("body!!!!!!!!!");

  const { name, description } = req.body;
  const { activityId } = req.params;

  try {
    if ((activityId, name, description)) {
      const updatedActivity = await updateActivity({
        id: activityId,
        name,
        description,
      });
      res.send(updatedActivity);
    } else {
      res.send({ message: "Missing fields" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activityRouter;
