const Hamster = require('./hamster');
const pool = require('../utils/pool');
const fs = require('fs');

describe('Hamster model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  it('inserts a new hamster into the database', async() => {
    const createdHamster = await Hamster.insert({ 
      name: 'polka', 
      age: 1, 
      color: 'white' 
    });

    const { rows } = await pool.query(
      'SELECT * FROM hamsters WHERE id=$1',
      [createdHamster.id]
    );
    
    expect(rows[0]).toEqual(createdHamster);
  });
});
