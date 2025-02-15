const express = require("express");
const Bibliotheque = require("../models/bibliotheque")
const Livre = require ("../models/livre")
/*
async function addPartie(req, res) {
    try {
        const { nom } = req.body;
        const joueur1 = await joueur.findById(req.params.id);
        const joueur2 = await joueur.findById(req.params.id2);
        const partie = new Partie({
            nom: nom,
            joueur_1: joueur1._id,
            joueur_2: joueur2._id,
            etat: "en cours",
        });
        await partie.save();
    res.status(200).send("le partie a bien été ajoute" );
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
}
*/
async function addLivre(req, res) {
    try {
        const { titre } = req.body;
        const { auteur } = req.body;
        const { date_publication } = req.body;
        const id_bibliotheque = await Bibliotheque.findById(req.params.id);
        const livre = new Livre({
            titre: titre,
            auteur: auteur,
            etat: "disponible",
            date_publication : date_publication,
            id_bibliotheque: id_bibliotheque._id,
        });
        id_bibliotheque.nb_livre=id_bibliotheque.nb_livre + 1 ;
        await id_bibliotheque.save();
        await livre.save();
    res.status(200).send("le livre a bien été ajoute" );
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
}
async function getAll(req, res) {
    try {   
        const livres = await Livre.find();
        res.send(livres); 
      } catch (err) {
        res.send(err);
      }
}
async function location(req, res) {
    try{
        const livre = await Livre.findById(req.params.id);
        const bibliotheque = await Bibliotheque.findById(livre.id_bibliotheque);
        livre.etat="loué";
        bibliotheque.nb_livre = bibliotheque.nb_livre - 1 ;
        await livre.save();
        await bibliotheque.save()
    }
 catch (error) {
    res.status(400).send({ error: error.toString() });
  }
}
async function resume(req, res) {
    try{
        
    }
 catch (error) {
    res.status(400).send({ error: error.toString() });
  }
}
module.exports = {addLivre,location,getAll,resume}