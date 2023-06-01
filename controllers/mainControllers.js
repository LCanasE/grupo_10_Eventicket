// Controladores páginas principales
const path = require("path");
let modelProductos = require('../models/productos');

const mainControllers = {

    getIndex:(req, res) => {
        let productos = modelProductos.findAll()
        res.render('home', {productos}) 
    }
}

module.exports = mainControllers;