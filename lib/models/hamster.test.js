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

  it('finds a hamster by id', async() => {
    const polka = await Hamster.insert({
      name: 'polka',
      age: 1,
      color: 'white'
    });

    const foundPolka = await Hamster.findById(polka.id);

    expect(foundPolka).toEqual({
      id: polka.id,
      name: 'polka',
      age: 1,
      color: 'white'
    });
  });

  it('returns null if it cant find a hamster by id', async() => {
    const hamster = await Hamster.findById(1234);

    expect(hamster).toEqual(null);
  });

  it('finds all hamsters', async() => {
    await Promise.all([
      Hamster.insert({
        name: 'polka',
        age: 1,
        color: 'white'
      }),
      Hamster.insert({
        name: 'coconut',
        age: 2,
        color: 'brown'
      }),
      Hamster.insert({
        name: 'bubba',
        age: 1,
        color: 'red'
      })
    ]);

    const hamsters = await Hamster.find();

    expect(hamsters).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'polka', age: 1, color: 'white' },
      { id: expect.any(String), name: 'coconut', age: 2, color: 'brown' },
      { id: expect.any(String), name: 'bubba', age: 1, color: 'red' },
    ]));

  });
  
  it('updates a row by id', async() => {
    const createdHamster = await Hamster.insert({
      name: 'polka',
      age: 1,
      color: 'white'
    });

    const updatedHamster = await Hamster.update(createdHamster.id, {
      name: 'polka',
      age: 2,
      color: 'milky'
    });

    expect(updatedHamster).toEqual({
      id: createdHamster.id,
      name: 'polka',
      age: 2,
      color: 'milky'
    });
  });

  it('deletes a row by id', async() => {
    const createdHamster = await Hamster.insert({
      name: 'polka',
      age: 1,
      color: 'white'
    });

    const deletedHamster = await Hamster.delete(createdHamster.id);

    expect(deletedHamster).toEqual({
      id: createdHamster.id,
      name: 'polka',
      age: 1,
      color: 'white'
    });
  });

});
