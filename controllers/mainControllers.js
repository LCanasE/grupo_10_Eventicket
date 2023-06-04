// Controladores páginas principales
const path = require("path");
const productsModel = require('../models/productsModel');

const mainControllers = {

    getIndex:(req, res) => {
    let eventos = productsModel.findAll();

    res.render('home', {title: 'Inicio', eventos});
},
}

module.exports = mainControllers;