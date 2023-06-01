// Controlador de productos
const path = require('path');
let modelProductos = require('../models/productos')

const productControllers = {

    getDetalleEventos: (req, res) => {
    let id = Number(req.params.id);
    let productoBuscado = modelProductos.findById(id);
    res.render('detalleEventos', {productoBuscado})
    },

    getCarrito: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/carrito.html")),
    res.render('carrito'),

    getEventos: (req, res) => {
    let productos = modelProductos.findAll()
    res.render('eventos', {productos})
    },

    getCrearEvento: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/creacionEventos.html")),
    res.render('creacionEventos'),

    getEditarEvento: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/edicionEventos.html")),
    res.render('edicionEventos'),

    getDetalleEventoAdmin: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/edicionEventos.html")),
    res.render('detalleEventosAdmin'),
}

module.exports = productControllers;