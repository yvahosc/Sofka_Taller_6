var express = require('express');
var router = express.Router();
const Game = require('../models/game.js');

/**
 * Creación de la ruta con método POST que tiene 
 * como objetivo el ingreso de la información por parte 
 * del usuario para la inicialización del juego y el anexo
 * de las apuestas para cada jugador.
 */
router.post('/', function(req, res, next) {
    id = req.body.id;
    type = req.body.type;
    gamersBet = req.body.gamerBet;
    
    /**
     * Función para la actualización de las apuestas para cada
     *  uno de los jugadores en la base de datos a partir de la
     *  información suministrada por parte del usuarios.
     * @param {*} gamerList Corresponde a la lista de jugadores 
     * que están registrados en el juego y a los cuales se les 
     * realizará la actualización de la apuesta
     * @returns Booleano que indica que se actualizó de manera 
     * exitosa en la base de datos la infomración correspondiente
     * a la apuesta de cada jugador.
     */
    async function updateGamersBet(gamerList){
        return new Promise(resolve => {
            let list1 = [];
            for (let clave in gamersBet) {
                if (gamersBet.hasOwnProperty(clave)){
                    
                    let list2 = [];
                    list2.push(gamersBet[clave])
                    list2.push(clave);
                    list1.push(list2);
                } 
            }
            
            let evaluator = false;
            for (let i = 0; i < (list1.length); i++){
                for (let j = 0; j < (gamerList.length); j++){
                    if (gamerList[j] == list1[i][1]){
                        evaluator = true;
                        Game.updateOne({'gamers._id': list1[i][1]}, 
                        { $set: { 'gamers.$.gamerBet': list1[i][0] }
                          
                        }).then((result) => { console.log(result) })
                        .catch((err) => { console.log(err) });
                    }
                } 
            }
            resolve(evaluator)
        });
    }
    
    /**
     * Función para la inicialización del juego y su información 
     * en la base de datos a partir de la información de las apuestas 
     * suministrada por parte del usuario.
     * @param {*} id Corresponde al valor ingresado por el usuario como
     *  id del juego el cual se quiere iniciar.
     * @param {*} type Corresponde al valor asignado por el usuario como
     *  tipo del juego el cual se quiere iniciar.
     * @param {*} gamersBet Corresponde a los valores asignados por el 
     * usuario como lista de apuestas correspondientes a cada jugador
     *  del juego 
     */
    const startGame = async function (id, type, gamersBet) {
        const data = Game.find({"id": {$eq: id}}, {gamers:1,});
        let gamerList = []
        const dat = await data.then(result =>{
            for(let i = 0; i < result[0].gamers.length; i++){
                gamerList.push(result[0].gamers[i]._id);
            }
        }).catch(err => console.error(err));
        updateBet = await updateGamersBet(gamerList);

        let list1 = [];
        for (let clave in gamersBet) {
            if (gamersBet.hasOwnProperty(clave)){
                
                let list2 = [];
                list2.push(gamersBet[clave])
                list2.push(clave);
                list1.push(list2);
            } 
        }
        list1.sort();

        if (updateBet){
            Game.findOne({'id': id}).then(result => {
                let nameWinner;
                for(let i = 0; i < list1.length; i++){
                    if (result.gamers[i]._id == list1[2][1]){
                        nameWinner = result.gamers[i].name;
                        break;
                    }
                }
                
                Game.updateOne({'id': id},{'winner.name': nameWinner, 
                    'winner.id': list1[2][1]}).then(result1 => {
                    res.json("Juego " + id + " iniciado y finalizado.");
                }).catch(err => console.error(err))
            }).catch(err => console.error(err));
            
        } else{
            res.json("Los usuarios y el id de juego ingresados no se " +
                "relacionan por lo que no es posible iniciar el juego por " + 
                "favor verificar.")
        }   
    }

    /**
     * Llamado a la ejecucuión de la función para la inicialización del juego
     * dentro de la cual se llama a la función que hace la actualización de
     * las apuestas de los jugadores de dicho juego, todo a partir de la información 
     * suministrada por el usuario.
     */
    startGame(id, type, gamersBet);
});

module.exports = router;