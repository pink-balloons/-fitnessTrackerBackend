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
  } catch (error) {}
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
  } catch (error) {}
}

async function getPublicRoutinesByActivity({ id }) {
  try {
  } catch (error) {}
}

async function getPublicRoutinesByActivity({ id }) {
  try {
  } catch (error) {}
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
  } catch (error) {}
}

async function updateRoutine({ id, isPublic, name, goal }) {
  try {
  } catch (error) {}
}

async function destroyRoutine(id) {
  try {
  } catch (error) {}
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
