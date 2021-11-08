const express = require("express");
const routineRouter = express.Router();
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
} = require("../db/routines");
const { getUserById } = require("../db/users");
const { requireUser } = require("./utils");

routineRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    if (routines) {
      res.send(routines);
    } else {
      res.send({ message: "No activities found" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routineRouter.post("/", requireUser, async (req, res, next) => {
  const { name, goal, isPublic } = req.body;
  const id = req.user.id;
  try {
    if ((name, goal, isPublic)) {
      const createdRoutine = await createRoutine({
        creatorId: id,
        isPublic,
        name,
        goal,
      });
      res.send(createdRoutine);
    } else {
      res.send({ message: "Missing fields" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routineRouter.patch("/:routineId", async (req, res, next) => {
  const { routineId } = req.params;
  const { name, goal, isPublic } = req.body;

  try {
    if ((routineId, name, goal, isPublic)) {
      const updatedRoutine = await updateRoutine({
        id: routineId,
        name,
        goal,
        isPublic,
      });
      res.send(updatedRoutine);
    } else {
      res.send({ message: "Missing fields" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// routineRouter.delete("/:routineId", async (req, res, next) => {});

// routineRouter.post("/:routineId/activities", async (req, res, next) => {});

module.exports = routineRouter;
