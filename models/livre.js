const mongo = require('mongoose');
const Schema = mongo.Schema;

const LIVRE = new Schema({
    titre:String,
    auteur:String,
    etat:String,
    date_publication:Date,
    id_bibliotheque:String
});

module.exports = mongo.model("livre", LIVRE , "livres"); 