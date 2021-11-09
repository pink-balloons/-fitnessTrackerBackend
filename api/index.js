// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const apiRouter = express.Router();
const client = require("../db/client");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db/users");

apiRouter.get("/health", async (req, res, next) => {
  try {
    res.send({
      message: "Healthy",
    });
  } catch (error) {
    next(error);
  }
});

apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    return next();
  }

  if (auth.startsWith("Bearer ")) {
    const token = auth.slice("Bearer ".length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);

      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({ name: "AuthError", message: "Error in authorization format" });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const activityRouter = require("./activities");
apiRouter.use("/activities", activityRouter);

const routineRouter = require("./routines");
apiRouter.use("/routines", routineRouter);

const routineActivitiesRouter = require("./routine_activities");
apiRouter.use("/routine_activities", routineActivitiesRouter);

module.exports = apiRouter;
