const path = require("path");
const router = require("express").Router();

//static file
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
  });
  
  router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
  });
  
  router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
  });
  
  //default if user puts in a query that did not exist
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  
  module.exports = router;