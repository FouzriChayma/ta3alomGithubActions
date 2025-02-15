const express = require("express");
const Bibliotheque = require("../models/bibliotheque")

async function addBiblio(req, res) {
    try {
      const { nom } = req.body; 
      const { adresse } = req.body;
      const newB = new Bibliotheque({nom: nom , nb_livre: 0, adresse: adresse });
      await newB.save();
    res.status(200).send("la bibliotheque a bien été ajoutée : " + newB);
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
}
async function getAll(req, res) {
    try {   
        const bibliotheques = await Bibliotheque.find();
        res.send(bibliotheques); 
      } catch (err) {
        res.send(err);
      }
}
async function getbyid(req, res) {
    try {
      const data = await Bibliotheque.findById(req.params.id);
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  }

  async function deleteB(req, res) {
    try {   
        const id = req.params.id;
        await Bibliotheque.findByIdAndDelete(id);
        res.status(200).send("biblio deleted");
      } catch (err) {
        res.send(err);
      }
    }
module.exports = {addBiblio,getAll,getbyid,deleteB};