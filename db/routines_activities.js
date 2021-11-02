const client = require("./client");

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
    INSERT INTO routine_activity("activityId", count, duration)
    VALUES($1, $2, $3)
    WHERE "routineId"=$4;
    `,
      [activityId, count, duration, routineId]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity({ id, count, duration }) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        UPDATE routine_activity
        WHERE id=$1
        SET count=${count} AND duration=${duration};
        `,
      [id]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    await client.query(
      `
        DELETE routine_activity
        WHERE id=$1
        `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const {
      rows: [routine_activities],
    } = await client.query(`
    SELECT * FROM routine_activity
    `);

    return routine_activities;
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
