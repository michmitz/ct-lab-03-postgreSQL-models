const pool = require('../utils/pool');

class Cow {
  id;
  name;
  breed;
  weight;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.breed = row.breed;
    this.weight = row.weight;
  }

  static async insert(chicken) {
    const { rows } = await pool.query('INSERT INTO cows (name, breed, weight) VALUES ($1, $2, $3) RETURNING *', [chicken.name, chicken.breed, chicken.weight]
    );
    return rows[0];
  }
}

module.exports = Cow;
