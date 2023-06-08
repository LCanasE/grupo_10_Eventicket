// Controlador de productos
const path = require('path');
let modelProductos = require('../models/productos');

const productControllers = {

    getEventsDetails: (req, res) => {
    let id = Number(req.params.id);
    let productos = modelProductos.findAll()
    let productoBuscado = modelProductos.findById(id);
    
    res.render('eventsDetails', {
        productoBuscado,
        productos,
        title: 'Detalle'})
    },

    getCart: (req, res) => {
    let id = Number(req.body.id);
    console.log(req.body);
    let productoBuscado = modelProductos.findById(id);
    res.render('cart', {
        productoBuscado,
        title: 'Carrito'})
    },

    getEvents: (req, res) => {
    let productos = modelProductos.findAll()
    res.render('events', {
        productos,
        title: 'Eventos'})
    },

    getCreateEvent: (req, res) => {
    res.render('createEvents',{title: 'Crear'})
    },

    postCreateEvent: (req, res) => {
        let eventoNuevo = req.body;
        eventoNuevo.img = '../img/events/1915.jpg';
        console.log(eventoNuevo);
        modelProductos.createOne(eventoNuevo);
        res.redirect('/');
    },

    getEditEvent: (req, res) => {
    let id = Number(req.params.id);
    let productoBuscado = modelProductos.findById(id);
    if (!productoBuscado) {
        return res.send('id inválido');
    }
    res.render('editEvents', {
        productoBuscado,
        title: 'Editar'})
    },

    getAdminEventsDetail: (req, res) =>
    res.render('adminEventsDetail'),
}

module.exports = productControllers;