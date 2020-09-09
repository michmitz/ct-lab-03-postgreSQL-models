const Cow = require('./cow');
const pool = require('../utils/pool');
const fs = require('fs');

describe('Cow model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  it('inserts a new cow into the database', async() => {
    const createdCow = await Cow.insert({ 
      name: 'Butter', 
      breed: 'Brown Swiss',
      weight: '400lbs'
    });

    const { rows } = await pool.query(
      'SELECT * FROM cows WHERE id=$1',
      [createdCow.id]
    );
    
    expect(rows[0]).toEqual(createdCow);
  });

  it('finds a chicken by id', async() => {
    const butter = await Cow.insert({
      name: 'Butter', 
      breed: 'Brown Swiss',
      weight: '400lbs'
    });

    const foundButter = await Cow.findById(butter.id);

    expect(foundButter).toEqual({
      id: butter.id,
      name: 'Butter', 
      breed: 'Brown Swiss',
      weight: '400lbs'
    });
  });

  it('returns null if it cant find a chicken by id', async() => {
    const cow = await Cow.findById(1234);

    expect(cow).toEqual(null);
  });
});
