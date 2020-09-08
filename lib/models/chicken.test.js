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

  it('returns null if it cant find a chicken by id', async() => {
    const chicken = await Chicken.findById(1234);

    expect(chicken).toEqual(null);
  });

  it('finds all chickens', async() => {
    await Promise.all([
      Chicken.insert({
        name: 'Thelma', 
        breed: 'Plymouth Rock',
        weight: '2lbs'
      }),
      Chicken.insert({
        name: 'Coconut',
        breed: 'Rhode Island Red',
        weight: '7lbs'
      }),
      Chicken.insert({
        name: 'Big Boi',
        breed: 'Brahma',
        weight: '20lbs'
      })
    ]);

    const chickens = await Chicken.find();

    expect(chickens).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'Thelma', breed: 'Plymouth Rock', weight: '2lbs' },
      { id: expect.any(String), name: 'Coconut', breed: 'Rhode Island Red', weight: '7lbs' },
      { id: expect.any(String), name: 'Big Boi', breed: 'Brahma', weight: '20lbs' }
    ]));
  });

  it('updates a row by id', async() => {
    const createdChicken = await Chicken.insert({
      name: 'Thelma',
      breed: 'Plymouth Rock',
      weight: '2lbs'
    });

    const updatedChicken = await Chicken.update(createdChicken.id, {
      name: 'Thelma',
      breed: 'Brahma',
      weight: '5lbs'
    });

    expect(updatedChicken).toEqual({
      id: createdChicken.id,
      name: 'Thelma',
      breed: 'Brahma',
      weight: '5lbs'
    });
  });

  it('deletes a row by id', async() => {
    const createdChicken = await Chicken.insert({
      name: 'Thelma',
      breed: 'Plymouth Rock',
      weight: '2lbs'
    });

    const deletedChicken = await Chicken.delete(createdChicken.id);

    expect(deletedChicken).toEqual({
      id: createdChicken.id,
      name: 'Thelma',
      breed: 'Plymouth Rock',
      weight: '2lbs'
    });
  });
});
