const Fruit = require('./fruit');
const pool = require('../utils/pool');
const fs = require('fs');

describe('Fruit model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  it('inserts a new vegetable into the database', async() => {
    const createdFruit = await Fruit.insert({ 
      name: 'strawberry', 
      color: 'red',
      weight: 3
    });

    const { rows } = await pool.query(
      'SELECT * FROM fruits WHERE id=$1',
      [createdFruit.id]
    );
    
    expect(rows[0]).toEqual(createdFruit);
  });

  it('finds a fruit by id', async() => {
    const strawberry = await Fruit.insert({
      name: 'strawberry', 
      color: 'red',
      weight: 3
    });

    const foundStrawberry = await Fruit.findById(strawberry.id);

    expect(foundStrawberry).toEqual({
      id: strawberry.id,
      name: 'strawberry', 
      color: 'red',
      weight: '3'
    });
  });

  it('returns null if it cant find a strawberry by id', async() => {
    const strawberry = await Fruit.findById(1234);

    expect(strawberry).toEqual(null);
  });

  it('finds all fruits', async() => {
    await Promise.all([
      Fruit.insert({
        name: 'strawberry', 
        color: 'red',
        weight: 3
      }),
      Fruit.insert({
        name: 'apple',
        color: 'pink',
        weight: 2
      }),
      Fruit.insert({
        name: 'orange',
        color: 'orange',
        weight: 4
      })
    ]);

    const fruits = await Fruit.find();

    expect(fruits).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'strawberry', color: 'red', weight: '3' },
      { id: expect.any(String), name: 'apple', color: 'pink', weight: '2' },
      { id: expect.any(String), name: 'orange', color: 'orange', weight: '4' }
    ]));
  });

  it('updates a row by id', async() => {
    const createdFruit = await Fruit.insert({
      name: 'strawberry', 
      color: 'red',
      weight: 3
    });

    const updatedFruit = await Fruit.update(createdFruit.id, {
      name: 'strawberry',
      color: 'pink',
      weight: '5'
    });

    expect(updatedFruit).toEqual({
      id: createdFruit.id,
      name: 'strawberry',
      color: 'pink',
      weight: '5'
    });
  });

  it('deletes a row by id', async() => {
    const createdFruit = await Fruit.insert({
      name: 'strawberry', 
      color: 'red',
      weight: 3
    });

    const deletedFruit = await Fruit.delete(createdFruit.id);

    expect(deletedFruit).toEqual({
      id: createdFruit.id,
      name: 'strawberry', 
      color: 'red',
      weight: '3'
    });
  });
});
