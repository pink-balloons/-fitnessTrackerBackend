const express = require("express");
const { getAllRoutinesByUser } = require("../db");
const { createUser, getUserByUsername } = require("../db/users");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log("A requests is being made to /users");

  next();
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // const _user = await getUserByUsername(username);

    // if (_user) {
    //   return;
    // }

    // if (password.length < 8) {
    //   return;
    // }

    const newUser = await createUser(username, password);
    console.log(newUser, "NEW USER LOG")
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return;
    }

    const user = await getUser(username, password);

    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  const { username } = req.params;

  try {
    const routines = await getAllRoutinesByUser(username);

    res.send(routines);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
