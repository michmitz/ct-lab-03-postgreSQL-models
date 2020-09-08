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

  static insert(hamster) {
    return pool.query(
      'INSERT INTO hamsters (name, age, color) VALUES ($1, $2, $3)',
      [hamster.name, hamster.age, hamster.color]
    );
  }
}

module.exports = Hamster;
