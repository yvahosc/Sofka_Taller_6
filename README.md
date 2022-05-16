# Ejercicio caso práctico de una página dinámica

## Este repositorio se creó para el desarrollo del ejercicio caso práctico de una página dinámica de un juego de dados para tres jugadores.

### Este contiene la creación de una aplicación siguiendo las instrucciones del ejercicio caso práctico de una página dinámica, utilizando el generador de express y una base de datos local MongoDB con mongoose.

> En esta aplicación se encontrará una página principal desde la cual se podrá acceder a una vista para la creación del juego ingresando la información de este a partir de un formulario y varias rutas a las cuales se podrá acceder utilizando Postman o una extención de VSCode (por ejemplo Thunder client), en estas se podrá aparte de crear un juego, ver la información de uno ya creado, iniciar el juego y actualizar las apuestas de los jugadores, además de observar la información del ganador de dicho juego.

Rutas:
* Index: GET - localhost:8080
* Creación de juego: POST - http://localhost:8080/createGame - Estructura de body:
      {
       "id": "Identificador del juego",
       "type": "",
       "gamers": [
       "Nombre jugador 1",
       "Nombre jugador 2",
       "Nombre jugador 3"
       ]
      }
      
* Inicio del juego: POST - http://localhost:8080/startGame - Estructura del body:
      {
       "id": "Identificador del juego",
       "type": "",
       "gamerBet": {
       "Identificador del jugador 1": Apuesta del jugador 1 (numero),
       "Identificador del jugador 2": Apuesta del jugador 2 (numero),
       "Identificador del jugador 3": Apuesta del jugador 3 (numero)
       }
      }

* Información del juego: GET
  - http://localhost:8080/game/identificadorDelJuego
  - http://localhost:8080/game/identificadorDelJuego/winner

## Es posible ejecutar el código descargando los archivos, abriéndolos en VSCode, intalando las dependencias utilizando el comando npm install en la consola, luego ejecutándolo utilizando el comando npm run start y por ultimo yendo a las rutas creadas utilizando la extensión Thunder client o a traves de Postman y ejecuntando cada una de dichas rutas con su información (sea en la URL para las peticiones GET o el body para las peticiones POST).
