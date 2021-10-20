// Pool
const db = require("../../database/postgresdb");

class User {
  async getUsers() {
    try {
      let query = `SELECT * FROM users`;
      let result = await db.query(query);

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async getUserById(id) {
    try {
      let query = `SELECT * FROM users WHERE id = $1`;
      let params = [id];
      let result = await db.query(query, params);

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(name, email) {
    try {
      let pass = name;
      let query = `INSERT INTO users (email, pass) VALUES ($1, $2)`;
      let params = [email, pass];
      let result = await db.query(query, params);

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

// module.exports = new User();
