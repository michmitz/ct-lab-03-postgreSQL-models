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

  it('finds all cows', async() => {
    await Promise.all([
      Cow.insert({
        name: 'Butter', 
        breed: 'Brown Swiss',
        weight: '400lbs'
      }),
      Cow.insert({
        name: 'Peanut',
        breed: 'Angus',
        weight: '300lbs'
      }),
      Cow.insert({
        name: 'Chicago',
        breed: 'Longhorn',
        weight: '200lbs'
      })
    ]);

    const cows = await Cow.find();

    expect(cows).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'Butter', breed: 'Brown Swiss', weight: '400lbs' },
      { id: expect.any(String), name: 'Peanut', breed: 'Angus', weight: '300lbs' },
      { id: expect.any(String), name: 'Chicago', breed: 'Longhorn', weight: '200lbs' }
    ]));
  });

  it('updates a row by id', async() => {
    const createdCow = await Cow.insert({
      name: 'Butter', 
      breed: 'Brown Swiss',
      weight: '400lbs'
    });

    const updatedCow = await Cow.update(createdCow.id, {
      name: 'ButterII',
      breed: 'Galloway',
      weight: '600lbs'
    });

    expect(updatedCow).toEqual({
      id: createdCow.id,
      name: 'ButterII',
      breed: 'Galloway',
      weight: '600lbs'
    });
  });

  it('deletes a row by id', async() => {
    const createdCow = await Cow.insert({
      name: 'Butter', 
      breed: 'Brown Swiss',
      weight: '400lbs'
    });

    const deletedCow = await Cow.delete(createdCow.id);

    expect(deletedCow).toEqual({
      id: createdCow.id,
      name: 'Butter', 
      breed: 'Brown Swiss',
      weight: '400lbs'
    });
  });
});
