const pool = require('../utils/pool');

class Veggie {
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

  static async insert(veggie) {
    const { rows } = await pool.query('INSERT INTO veggies (name, color, weight) VALUES ($1, $2, $3) RETURNING *', [veggie.name, veggie.color, veggie.weight]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM veggies WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Veggie(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM veggies'
    );

    return rows.map(row => new Veggie(row));
  }

  static async update(id, updatedVeggie) {
    const { rows } = await pool.query(
      `UPDATE veggies
      SET name=$1,
          color=$2,
          weight=$3
      WHERE id=$4
      RETURNING *
      `,
      [updatedVeggie.name, updatedVeggie.color, updatedVeggie.weight, id]
    );

    return new Veggie(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM veggies WHERE id=$1 RETURNING *',
      [id]
    );

    return new Veggie(rows[0]);
  }
}

module.exports = Veggie;
