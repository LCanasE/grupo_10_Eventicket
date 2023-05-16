// Controlador de productos
const path = require('path');

const productControllers = {

    getDetalleEventos: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/products/detalleEventos.html")),

    getCarrito: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/products/carrito.html")),

    getEventos: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/products/eventos.html")),

    getCrearEventos: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/products/creacionEventos.html")),

    getEditarEventos: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/products/edicionEventos.html")),

}

module.exports = productControllers;