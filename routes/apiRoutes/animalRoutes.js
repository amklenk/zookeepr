const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');


router.get('/animals', (req, res) => {
  let results = animals;
  try {
      if (req.query) {
        results = filterByQuery(req.query, results);
      }
      res.json(results);
  } catch (error) {
    res.json(error);
  }
});

router.get('/animals/:id', async(req, res) => {
  const result = await findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

module.exports  = router;