const express = require("express");
const activityRouter = express.Router();

activityRouter.get("/", (req, res, next) => {
  try {
    const activities = await getAllActivities();

    res.send(activities);
  } catch (error) {
    throw error;
  }
});

activityRouter.post("/", (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = activityRouter;
