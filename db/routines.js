const client = require("./client");

async function getRoutineById(id) {
  try {
    const { rows: routine } = await client.query(
      `
    SELECT *
    FROM routines
    WHERE id = $1;
    `,
      [id]
    );

    if (!routine) {
      throw {
        name: "RoutineNotFoundError",
        message: "Could not find a routine with that id",
      };
    }

    return routine;
  } catch (error) {
    console.error("Problem in getRoutineById");
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows: routines } = await client.query(
      `
      SELECT * from routines;
      `
    );
    delete routines.activities;
    return routines;
  } catch (error) {
    console.error("Probelm getting routines without activities");
  }
}

async function getAllRoutines() {
  try {

    const { rows: [routines] } = await client.query(`
    SELECT * FROM routines

    `);
    console.log(routines, "ROUTINES LOG")
    return routines;
  } catch (error) {
    console.error("problem with getting all routines");
  }
}

async function getAllPublicRoutines() {
  try {
    const {rows: [routines]} = await client.query(`
    SELECT * FROM routines
    WHERE "isPublic"='true'
    `)
    console.log(routines, "ROUTINES LOG")
    return routines
  } catch (error) {
    console.error("Problem getting all Public routines")
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
  } catch (error) {}
}

async function getPublicRoutinesByUser({ username }) {
  try {
  } catch (error) {
    console.error("Problem with getting routines by user");
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routine } = await client.query(
      `
    SELECT * from routines 
    WHERE id = ${id};
    `
    );
  } catch (error) {}
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const { rows: routine } = await client.query(
      `
      INSERT into routines("creatorId", isPublic, name, goal)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );

    return routine
  } catch (error) {
    console.error("Problem creating routine");
  }
}

async function updateRoutine({ id, isPublic, name, goal }) {
  try {
  } catch (error) {}
}

async function destroyRoutine(id) {
  try {
    const { rows: routine } = await client.query(
      `
    DELETE * from routines 
    where id = ${id};
    `
    );
  } catch (error) {
    console.error("Problem deleting routine");
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
