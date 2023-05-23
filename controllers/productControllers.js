// Controlador de productos
const path = require('path');

const productControllers = {

    getDetalleEventos: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/detalleEventos.html")),
    res.render('detalleEventos'),

    getCarrito: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/carrito.html")),
    res.render('carrito'),

    getEventos: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/products/eventos.html")),
    res.render('eventos'),

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