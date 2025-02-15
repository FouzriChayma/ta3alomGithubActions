var express = require('express');
var router = express.Router();

const bibliothequeController = require ("../controllers/bibliothequeController")
router.post('/add', bibliothequeController.addBiblio);
router.get('/list', bibliothequeController.getAll);
router.get('/details/:id', bibliothequeController.getbyid);
router.delete('/delete/:id', bibliothequeController.deleteB);

module.exports = router;
