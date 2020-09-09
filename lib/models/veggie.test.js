const Veggie = require('./veggie');
const pool = require('../utils/pool');
const fs = require('fs');

describe('Veggie model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  it('inserts a new vegetable into the database', async() => {
    const createdVeggie = await Veggie.insert({ 
      name: 'carrot', 
      color: 'orange',
      weight: 1
    });

    const { rows } = await pool.query(
      'SELECT * FROM veggies WHERE id=$1',
      [createdVeggie.id]
    );
    
    expect(rows[0]).toEqual(createdVeggie);
  });

  it('finds a veggie by id', async() => {
    const carrot = await Veggie.insert({
      name: 'carrot', 
      color: 'orange',
      weight: 1
    });

    const foundCarrot = await Veggie.findById(carrot.id);

    expect(foundCarrot).toEqual({
      id: carrot.id,
      name: 'carrot', 
      color: 'orange',
      weight: '1'
    });
  });

  it('returns null if it cant find a carrot by id', async() => {
    const carrot = await Veggie.findById(1234);

    expect(carrot).toEqual(null);
  });

  it('finds all veggies', async() => {
    await Promise.all([
      Veggie.insert({
        name: 'carrot', 
        color: 'orange',
        weight: 1
      }),
      Veggie.insert({
        name: 'jalapeno',
        color: 'green',
        weight: 1
      }),
      Veggie.insert({
        name: 'kale',
        color: 'green',
        weight: 2
      })
    ]);

    const veggies = await Veggie.find();

    expect(veggies).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'carrot', color: 'orange', weight: '1' },
      { id: expect.any(String), name: 'jalapeno', color: 'green', weight: '1' },
      { id: expect.any(String), name: 'kale', color: 'green', weight: '2' }
    ]));
  });

  it('updates a row by id', async() => {
    const createdVeggie = await Veggie.insert({
      name: 'carrot', 
      color: 'orange',
      weight: '1'
    });

    const updatedVeggie = await Veggie.update(createdVeggie.id, {
      name: 'carrot',
      color: 'purple',
      weight: '3'
    });

    expect(updatedVeggie).toEqual({
      id: createdVeggie.id,
      name: 'carrot',
      color: 'purple',
      weight: '3'
    });
  });

  it('deletes a row by id', async() => {
    const createdVeggie = await Veggie.insert({
      name: 'carrot', 
      color: 'orange',
      weight: '1'
    });

    const deletedVeggie = await Veggie.delete(createdVeggie.id);

    expect(deletedVeggie).toEqual({
      id: createdVeggie.id,
      name: 'carrot', 
      color: 'orange',
      weight: '1'
    });
  });
});
