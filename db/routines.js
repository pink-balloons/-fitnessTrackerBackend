const client = require("./client");
const { dbFields } = require("./utils");

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
    throw error;
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
    console.error("Problem getting routines without activities");
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const {
      rows: [routines],
    } = await client.query(`
    SELECT * FROM routines;
    `);
    return routines;
  } catch (error) {
    console.error("problem with getting all routines");
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const {
      rows: [routines],
    } = await client.query(`
    SELECT * FROM routines
    WHERE "isPublic"='true'
    `);
    return routines;
  } catch (error) {
    console.error("Problem getting all Public routines");
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(`
      SELECT * FROM routines
      WHERE "creatorName" = ${username}
    `);
    if (!routines) {
      return null;
    }
    return routines;
  } catch (error) {
    console.error("Problem with getting routine by username");
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(`
    SELECT * FROM routines
    WHERE "creatorName" = ${username} AND "isPublic" = 'true';
  `);
    if (!routines) {
      return null;
    }
    return routines;
  } catch (error) {
    console.error("Problem with getting public routines by user");
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: activity } = await client.query(
      `
    SELECT * FROM activities 
    WHERE id = ${id}
    RETURNING *; 
    `
    );
    activityName = activity.name;

    const { rows: routines } = await client.query(`
      
      SELECT * FROM routines
      WHERE name = ${activityName} AND "isPublic" = 'true'
      RETURNING *;
      `);
    return routines;
  } catch (error) {
    console.error("Problem getting public routine by activity");
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
    const toUpDate = {};

    for (const key in fields) {
      if (fields[key] !== undefined) {
        toUpDate[key] = fields[key];
      }
    }

    const fieldsToUpdate = dbFields(toUpDate);

    if (fieldsToUpdate) {
      const { rows: routine } = await client.query(
        `
          UPDATE routines
           SET ${fieldsToUpdate.insert} 
           WHERE id = ${id}
           returning *;
          `,
        fieldsToUpdate.vals
      );
      return routine;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Problem with updating routine");
    throw error;
  }
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
    throw error;
  }
}

async function getRoutineActivitiesByRoutine() {}

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
  getRoutineActivitiesByRoutine,
};
