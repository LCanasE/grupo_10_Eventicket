// Controladores páginas principales
const path = require("path");
let modelProducts = require('../models/productos');

const mainControllers = {

    getIndex:(req, res) => {
        let productos = modelProducts.findAll();
        res.render('home', {
            productos,
            title: 'Home'}) 
    }
}


module.exports = mainControllers;