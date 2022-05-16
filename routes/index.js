var express = require('express');
var router = express.Router();

/**
 * Creación de la ruta GET que lleva a la página inicial de la aplicación,
 * desde la que se da la bienvenida y se muestra el link de acceso para la
 * creación de un juego.
 */
router.get('/', function(req, res, next) {
  res.render('index', 
    { title: 'Caso práctico de una página dinámica' });
});

module.exports = router;
