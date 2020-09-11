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

  static async insert(cow) {
    const { rows } = await pool.query('INSERT INTO cows (name, breed, weight) VALUES ($1, $2, $3) RETURNING *', [cow.name, cow.breed, cow.weight]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM cows WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Cow(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM cows'
    );

    return rows.map(row => new Cow(row));
  }

  static async update(id, updatedCow) {
    const { rows } = await pool.query(
      `UPDATE cows
      SET name=$1,
          breed=$2,
          weight=$3
      WHERE id=$4
      RETURNING *
      `,
      [updatedCow.name, updatedCow.breed, updatedCow.weight, id]
    );

    return new Cow(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM cows WHERE id=$1 RETURNING *',
      [id]
    );

    return new Cow(rows[0]);
  }
}

module.exports = Cow;
