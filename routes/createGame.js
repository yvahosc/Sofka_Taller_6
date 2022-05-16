var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Game = require('../models/game.js');

/**
 * Creación de la ruta GET que lleva 
 * hacia el formulario de la aplicación
 */
router.get('/', function(req, res, next) {
  res.render('createGame', { title: 
    'Caso práctico de una página dinámica' })
});

/**
 * Creación de la ruta con método POST que tiene 
 * como objetivo el ingreso de la información por parte 
 * del usuario para la creación del juego.
 */
router.post('/', function(req, res, next) {
  id = req.body.id;
  type = req.body.type;
  gamersList = req.body.gamers;

  /**
   * Función para la creación de los jugadores y su información 
   * en la base de datos a partir de la información suministrada 
   * en el formulario por parte del usuarios.
   * @returns Booleano que indica que se crearon de manera 
   * exitosa los usuarios.
   */
  async function createGamers(){
    let evaluator = false;
    const data = await Gamer.find({ 'game': { $eq: id } }  
    ).then(result => {
      if (result.length == 0){
        for(i = 0; i < gamersList.length; i++){
          try{
            const gamer = new Gamer({
              name: gamersList[i],
              game: id,
            });
            gamer.save();
            evaluator = true;
          }
          catch(err) {
            console.error(err);
          }; 
        }
      }
    }).catch(err => {console.error(err)});
    return evaluator;
  }
  
  /**
   * Función para la creación del juego y su información 
   * en la base de datos a partir de la información suministrada 
   * en el formulario por parte del usuario.
   * @param {*} id Corresponde al valor asignado por el usuario como
   *  id del juego
   * @param {*} type Corresponde al valor asignado por el usuario como
   *  tipo del juego
   * @param {*} gamersList Corresponde a los valores asignados por el 
   * usuario como lista de juegadores del juego
   */
  const createGame = async function (id, type, gamersList){
    const dato =  Game.find({ 'id': { $eq: id } }).then(result =>{
      if (result.length == 0) {
        try{
          newGame = new Game({
            id: id,
            type: type,
            gamers: [
              {name: gamersList[0]}, 
              {name: gamersList[1]}, 
              {name: gamersList[2]}
            ]
          })
          newGame.save().then(result => {
            res.render('createGame',
                { title: 'Caso práctico de una página dinámica', id: id,
                  type: type, gamersList: gamersList, message: "El juego "
                      + id + " Ha sido creado."})})
          .catch(err => { console.error(err) });
        }
        catch(err) {
          console.error(err);
        };
      }
      else{
        res.render('createGame',
            { title: 'Caso práctico de una página dinámica', id: id,
              type: type, gamersList: gamersList, message: "El juego con id " + id +
                  " ya se encuentra registrado por favor ingrese uno nuevo."})
      }  
    }).catch(err => console.error(err));  
  }

  /**
   * Llamado a la ejecucuión de la función para la creación del juego
   *  dentro de la cual se llama a la función que hace la creación de
   *  los jugadores de dicho juego, todo a partor de la información 
   * suministrada por el usuario a partir de un formulario.
   */
  createGame(id, type, gamersList);
});

module.exports = router;
