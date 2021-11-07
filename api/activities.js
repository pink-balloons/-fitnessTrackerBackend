const express = require("express");
const {createActivity, getAllActivities} = require("../db")
const activityRouter = express.Router();

activityRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();

    res.send(activities);
  } catch (error) {
    throw error;
  }
});

activityRouter.post("/", async (req, res, next) => {
  const {name, description} = req.body
  try {


    const newActivity = await createActivity(name, description)

    res.send(newActivity)
  } catch (error) {
    next(error)
  }
});

module.exports = activityRouter;
