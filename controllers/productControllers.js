// Controlador de productos
const path = require('path');

const productControllers = {

    getDetalleEventos: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/detalleEventos.html")),
    res.render('./products/detalleEventos.ejs'),

    getCarrito: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/carrito.html")),
    res.render('./products/carrito.ejs'),

    getEventos: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/eventos.html")),
    res.render('./products/eventos.ejs'),

    getCrearEvento: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/creacionEventos.html")),
    res.render('./products/creacionEventos.ejs'),

    getEditarEvento: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/edicionEventos.html")),
    res.render('./products/edicionEventos.ejs'),
}

module.exports = productControllers;