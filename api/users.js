const express = require("express");
const { createUser, getUserByUsername } = require("../db/users");
const usersRouter = express.Router();

usersRouter.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      return;
    }

    if (password.length < 8) {
      return;
    }

    const newUser = await createUser(username, password);

    res.send(newUser);
  } catch (error) {
    throw error;
  }
});

usersRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return;
    }

    const user = await getUser(username, password);

    res.send(user);
  } catch (error) {
    throw error;
  }
});

usersRouter.get("/me", (req, res, next) => {
    
})
