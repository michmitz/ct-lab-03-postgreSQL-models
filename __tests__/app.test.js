const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Fruit = require('../lib/models/fruit');

describe('routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('create a new fruit via POST', async() => {
    const response = await request(app)
      .post('/api/v1/fruits')
      .send({ name: 'strawberry', color: 'red', weight: 3 });

    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'strawberry',
      color: 'red',
      weight: '3'
    });
  });

  it('finds a fruit by id via GET', async() => {
    const createdFruit = await Fruit.insert({
      name: 'strawberry',
      color: 'red',
      weight: 3
    });

    const response = await request(app)
      .get(`/api/v1/fruits/${createdFruit.id}`);

    expect(response.body).toEqual({
      id: createdFruit.id,
      name: 'strawberry',
      color: 'red',
      weight: '3'
    });
  });

  it('gets all fruits', async() => {
    const createdFruit = await Fruit.insert({
      name: 'strawberry',
      color: 'red',
      weight: 3
    });
    const createdFruit2 = await Fruit.insert({
      name: 'blueberry',
      color: 'blue',
      weight: 2
    });
    const createdFruit3 = await Fruit.insert({
      name: 'peach',
      color: 'yellow',
      weight: 5
    });

    const response = await request(app)
      .get('/api/v1/fruits/');

    expect(response.body).toEqual(expect.arrayContaining([
      {
        id: createdFruit.id,
        name: 'strawberry',
        color: 'red',
        weight: '3'
      },
      {
        id: createdFruit2.id,
        name: 'blueberry',
        color: 'blue',
        weight: '2'
      },
      {
        id: createdFruit3.id,
        name: 'peach',
        color: 'yellow',
        weight: '5' 
      }
    ]));
  });

  it('deletes a fruit by id via DELETE', async() => {
    const createdFruit = await Fruit.insert({
      name: 'strawberry',
      color: 'red',
      weight: 3
    });

    const response = await request(app)
      .delete(`/api/v1/fruits/${createdFruit.id}`);

    expect(response.body).toEqual({
      id: createdFruit.id,
      name: 'strawberry',
      color: 'red',
      weight: '3'
    });
  });
});
