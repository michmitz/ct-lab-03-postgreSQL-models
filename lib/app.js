const express = require('express');
const Fruit = require('./models/fruit');
const app = express();

app.use(express.json());

app.post('/api/v1/fruits', async(req, res, next) => {
  try {
    const createdFruit = await Fruit.insert(req.body);
    res.send(createdFruit);
  } catch(error) {
    next(error);
  }
});

app.get('/api/v1/fruits/:id', async(req, res, next) => {
  try {
    const createdFruit = await Fruit.findById(req.params.id);
    res.send(createdFruit); 
  } catch(error) {
    next(error);
  }
});

app.delete('/api/v1/fruits/:id', async(req, res, next) => {
  try {
    const deletedFruit = await Fruit.delete(req.params.id);
    res.send(deletedFruit);
  } catch(error) {
    next(error);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
