const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env;
const { getAllRoutinesByUser } = require("../db");
const { createUser, getUserByUsername, getUser } = require("../db/users");

usersRouter.use((req, res, next) => {
  console.log("A requests is being made to /users");

  next();
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

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const _user = await getUserByUsername(username);

    if (_user) {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 8) {
      res.status(401);

      next({ name: "PasswordLengthError", message: "Password Too Short!" });
    } else {
      const newUser = await createUser({ username, password });
    }

    if (!newUser) {
      next({
        name: "UserCreationError",
        message: "There was a problem registering you. Please try again!",
      });
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({ user, message: "you're signed up!", token });
    }
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
