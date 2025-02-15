const mongo = require('mongoose');
const Schema = mongo.Schema;

const BIBLIOTHEQUE = new Schema({
    nom:String,
    nb_livre:Number,
    adresse:String
});

module.exports = mongo.model("bibliotheque", BIBLIOTHEQUE , "bibliotheques"); 