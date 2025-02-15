var express = require('express');
var router = express.Router();
const validate = require("../middleware/validate")

const livreController = require("../controllers/livreController")
router.post('/create/:id',validate, livreController.addLivre);
router.get('/list', livreController.getAll);
router.put('/location/:id', livreController.location);
module.exports = router;
