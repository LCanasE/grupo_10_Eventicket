// Controlador de productos
const path = require('path');
let modelProductos = require('../models/productos')

const productControllers = {

    getEventsDetails: (req, res) => {
    let id = Number(req.params.id);
    let productos = modelProductos.findAll()
    let productoBuscado = modelProductos.findById(id);
    
    res.render('eventsDetails', {productoBuscado, productos})
    },

    getCart: (req, res) => {
    let id = Number(req.body.id);
    console.log(req.body);
    let productoBuscado = modelProductos.findById(id);
    res.render('cart', {productoBuscado})
    },
   
    getEvents: (req, res) => {
    let productos = modelProductos.findAll()
    res.render('events', {productos})
    },

    getCrearEvento: (req, res) =>
    res.render('creacionEventos'),

    getEditarEvento: (req, res) => {
    let id = Number(req.params.id);
    let productoBuscado = modelProductos.findById(id);
    if (!productoBuscado) {
        return res.send('id inválido');
    }
    res.render('edicionEventos', {productoBuscado})
    },



    getDetalleEventoAdmin: (req, res) =>
    res.render('detalleEventosAdmin'),
}

module.exports = productControllers;