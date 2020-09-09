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
      weight: '1'
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
      weight: '1'
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
});
