const pool = require('../utils/pool');

class Fruit {
  id;
  name;
  color;
  weight;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.weight = row.weight;
  }

  static async insert(fruit) {
    const { rows } = await pool.query('INSERT INTO fruits (name, color, weight) VALUES ($1, $2, $3) RETURNING *', [fruit.name, fruit.color, fruit.weight]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM fruits WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Fruit(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM fruits'
    );

    return rows.map(row => new Fruit(row));
  }
}

module.exports = Fruit;
