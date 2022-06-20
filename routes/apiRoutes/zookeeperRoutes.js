const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers");

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    try {
        if (req.query) {
          results = filterByQuery(req.query, results);
        }
        res.json(results);
    } catch (error) {
      res.json(error);
    }
  });
  
  router.get('/zookeepers/:id', async(req, res) => {
    const result = await findById(req.params.id, zookeepers);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });
  
  router.post('/zookeepers', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();
  
    if (!validateZookeeper(req.body)) {
      res.status(400).send('The zookeeper is not properly formatted.');
    } else {
      const zookeeper = createNewZookeeper(req.body, zookeepers);
      res.json(zookeeper);
    }
  });
  
  module.exports  = router;