const client = require("./client");

async function getRoutineById(id) {
  try {
    const { rows: routine } = await client.query(
      `
    
    SELECT *
    FROM routines
    WHERE id = $1
    `,
      [id]
    );
    return routine;
  } catch (error) {
    console.error("Problem in getRoutineById");
  }
}

async function getRoutinesWithoutActivities() {
  try {
  } catch (error) {}
}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT * FROM routines
    `);
    return routines;
  } catch (error) {
    console.error("problem with getting all routines");
  }
}

async function getAllPublicRoutines() {
  try {
  } catch (error) {}
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
    WHERE id = $1
    `,
      [id]
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
    where id = $1
    `[id]
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
