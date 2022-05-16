var express = require('express');
var router = express.Router();
const Game = require('../models/game.js');
const {stdout} = require("nodemon/lib/config/defaults");


/**
 * Creación de la ruta GET que visualiza la información de un juego ya
 * registrado en la base de datos y del cual se conoce el parametro id y es
 * enviado por medio de la url.
 */
router.get('/:id', function(req, res, next) {
  const data = Game.find({"id": {$eq: req.params.id}}, 
    {_id:0, type:0, deleted:0, createdAt:0, updatedAt:0, __v:0,
     'gamers.gamerBet': 0
    });
  data.then(result => {
    if (result.length == 0){
      res.render('error2',
          {message: 'No se encontró juego con el id compartido.' });
    } else{
      game1 = result[0];
      res.render('game',
          { title: req.params.id, gamer: game1 });
    }
  }).catch(err => res.json(err));
});

/**
 * Creación de la ruta GET que visualiza la información del ganador de un
 * juego ya registrado en la base de datos y del cual se conoce el parámetro
 * id y es enviado por medio de la url.
 */
router.get('/:id/winner', function(req, res, next) {
  const data = Game.find({"id": {$eq: req.params.id}}, {winner: 1,
     _id: 0});
  data.then(result => {
    if (result.length == 0) {
      res.render('error2',
          {message: 'No se encontró juego para este id, verifique por favor.' });
    }else if (result[0].winner.name == null || result[0].winner.id == null){
      res.render('error2',
          {message: 'No se encontró ganador para este juego, inícielo' +
                ' primero.' });
    }
    else{
      game2 = result[0];
      res.render('winner',
          { title: req.params.id, gamer: game2 });
    }
  }).catch(err => res.json(err));
});

module.exports = router;
