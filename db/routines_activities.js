const client = require("./client");
const { dbFields } = require("./utils");

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        SELECT * FROM routine_activities
        WHERE id=$1;
        `,
      [id]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
    INSERT INTO routine_activities("routineId", "activityId", count, duration)
    VALUES($1, $2, $3, $4)
    ON CONFLICT ("routineId", "activityId") DO NOTHING
    RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  const result = dbFields(fields);
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        UPDATE routine_activities
        SET ${result.insert}
        WHERE id=${id}
        RETURNING *;
        `,
      result.vals
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {rows: [activity]} = await client.query(
      `
        DELETE FROM routine_activities
        WHERE id=$1
        RETURNING *;
        `, [id]
    );
    return activity
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const {
      rows
    } = await client.query(`
    SELECT * FROM routine_activities
    WHERE id=${id}
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
