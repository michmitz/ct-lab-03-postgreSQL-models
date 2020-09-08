const pool = require('../utils/pool');

class Chicken {
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
    const { rows } = await pool.query('INSERT INTO chickens (name, breed, weight) VALUES ($1, $2, $3) RETURNING *', [chicken.name, chicken.breed, chicken.weight]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM chickens WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Chicken(rows[0]);
  }
}

module.exports = Chicken;
