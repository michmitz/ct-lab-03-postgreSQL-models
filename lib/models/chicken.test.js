const Chicken = require('./chicken');
const pool = require('../utils/pool');
const fs = require('fs');

describe('Chicken model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  it('inserts a new chicken into the database', async() => {
    const createdChicken = await Chicken.insert({ 
      name: 'Thelma', 
      breed: 'Plymouth Rock',
      weight: '2lbs'
    });

    const { rows } = await pool.query(
      'SELECT * FROM chickens WHERE id=$1',
      [createdChicken.id]
    );
    
    expect(rows[0]).toEqual(createdChicken);
  });

  it('finds a chicken by id', async() => {
    const thelma = await Chicken.insert({
      name: 'Thelma', 
      breed: 'Plymouth Rock',
      weight: '2lbs'
    });

    const foundThelma = await Chicken.findById(thelma.id);

    expect(foundThelma).toEqual({
      id: thelma.id,
      name: 'Thelma', 
      breed: 'Plymouth Rock',
      weight: '2lbs'
    });
  });
});
