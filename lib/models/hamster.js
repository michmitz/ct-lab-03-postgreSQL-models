const pool = require('../utils/pool');

class Hamster {
  id;
  name;
  age;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.color = row.color;
  }

  static async insert(hamster) {
    const { rows } = await pool.query(
      'INSERT INTO hamsters (name, age, color) VALUES ($1, $2, $3) RETURNING *',
      [hamster.name, hamster.age, hamster.color]
    );

    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM hamsters WHERE id=$1',
      [id]
    );

    return new Hamster(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM hamsters'
    );

    return rows.map(row => new Hamster(row));
  }
}

module.exports = Hamster;
