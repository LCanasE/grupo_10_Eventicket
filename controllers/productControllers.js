// Controlador de productos
const path = require('path');

const productControllers = {

    getDetalleEventos: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/products/detalleEventos.html")),

    getCarrito: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/products/carrito.html")),

    getEventos: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/products/eventos.html"))

}

module.exports = productControllers;