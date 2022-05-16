const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseSoftDelete = require('mongoose-delete');

/**
 * Creación del modelo para el anexo de la información a la base de datos.
 */
const gameSchema = new Schema({
    id: {
        type: String,
        trim: true,
        required: [true, 'El identificador del juego es requerido.'], 
        unique: [true, 'El identificador del juego debe ser unico.']
    },
    type: {
        type: String,
        trim: true,
    },
    gamers: [
        { 
             name: {
                type: String,
                trim: true,
                required: [true, 
                    'El nombre de los jugadores es requerido.']   
            },
            gamerBet: {
                type: Number,
                trim: true,
                default: 0
            }
        }
    ], 
    inProgress: {
        type: Boolean,
        default: false
    },
    winner: {
        name: {
            type: String,
            default: null  
        },
        id: {
            type: String,
            default: null
        }
    },
    
    
}, { timestamps: true });

gameSchema.plugin(mongooseSoftDelete);

module.exports = Game = mongoose.model('Game', gameSchema);