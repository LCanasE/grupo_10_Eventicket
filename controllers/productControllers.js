// Controlador de productos
const path = require('path');

const productControllers = {

    getDetalleEventos: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/detalleEventos.html")),

    getCarrito: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/carrito.html")),

    getEventos: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/eventos.html"))

}

module.exports = productControllers;