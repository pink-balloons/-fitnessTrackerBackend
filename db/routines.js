const client = require("./client");
const { dbFields } = require("./utils");
const { attachActivitiesToRoutines } = require("./activities");
const { getUserByUsername } = require("./users");
const { destroyRoutineActivity } = require("./routines_activities");

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    SELECT *
    FROM routines
    WHERE id = $1;
    `,
      [id]
    );

    if (!routine) {
      return null;
    }

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(
      `
      SELECT * from routines;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" FROM routines 
    JOIN users ON routines."creatorId"=users.id
    `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" FROM routines 
    JOIN users ON routines."creatorId"=users.id
    WHERE "isPublic"='true'
    `);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    console.error("Problem getting all Public routines");
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const user = await getUserByUsername(username);
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName" FROM routines 
      JOIN users ON routines."creatorId"=users.id
      WHERE "creatorId"=$1
    `,
      [user.id]
    );

    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const user = await getUserByUsername(username);
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName" FROM routines 
      JOIN users ON routines."creatorId"=users.id
      WHERE "creatorId"=$1
      AND "isPublic"='true'
    `,
      [user.id]
    );
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName" FROM routines 
      JOIN users ON routines."creatorId"=users.id
      WHERE "isPublic"='true'
    `
    );
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      INSERT INTO routines ("creatorId", "isPublic", "name", "goal")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    console.error("Problem creating routine");
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {
  try {
    const result = dbFields(fields);
    const {
      rows: [routine],
    } = await client.query(
      `
    UPDATE routines
    SET ${result.insert}
    WHERE id=${id}
    RETURNING *;
    `,
      result.vals
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
  try {
    await destroyRoutineActivity(id);

    const {
      rows: [routine],
    } = await client.query(
      `
    DELETE FROM routines 
    where id = $1
    RETURNING *;
    `,
      [id]
    );
    return routine;
  } catch (error) {
    throw error;
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
