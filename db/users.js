
/* ALL THEM REQUIRES GONNA GO HERE */
const client = require('./client')


async function createUser({username, password}){
    try {
        const {rows: [user]} = await client.query(`
        INSERT INTO users(username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password])

        return user
    } catch (error) {
        throw error
    }
}

async function getUser({username, password}){
try {
    const {rows:[user]} = await client.query(`
    SELECT * FROM users
    WHERE username=$1
    `, [username])

    if(user.password !== password){
        throw Error("Username or Password is incorrect")
    }

    return user
} catch (error) {
  throw error  
}
}

async function getUserUserById(id){
try {
    
} catch (error) {
    throw error
}
}

async function getUserByUsername(username){
try {
    
} catch (error) {
    throw error
}
}

module.exports = {
    createUser,
    getUser,
    getUserUserById,
    getUserByUsername
}
=======
/* ALL THEM REQUIRES GONNA GO HERE */
const client = require("./client");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `,
      [username, password]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE username=$1;
    `,
      [username]
    );

    if (user.password !== password) {
      throw Error("Username or Password is incorrect");
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE id=$1;
    `,
      [id]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE username=$1;
    `,
      [username]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};

