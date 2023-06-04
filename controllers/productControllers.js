// Controlador de productos
const path = require('path');
const productsModel = require('../models/productsModel');

const productControllers = {

    getDetalleEventos: (req, res) => {
        const eventos = productsModel.findAll();
        const id = Number(req.params.id);

        const eventoAMostrar = productsModel.findById(id);

        res.render('detalleEventos', { title: 'Detalle', evento: eventoAMostrar, eventos });
    },

    deleteEvento: (req, res) => {
        const id = Number(req.params.id);

        productsModel.deleteById(id);

        res.redirect('/');
    },

    getCarrito: (req, res) =>{
        const id = Number(req.params.id);
        
        const eventoCarrito = productsModel.findById(id);

        res.render('carrito', { title: 'Carrito', eventoCarrito });
    },

    getEventos: (req, res) => {
        let eventos = productsModel.findAll();

        res.render('eventos', {
            title: 'Eventos',
            eventos
        })},

    getCrearEvento: (req, res) =>{

        res.render('creacionEventos', { title: 'Crear' })
    },

    postCrearEvento: (req, res) => {
        let datos = req.body;
        datos.price = Number(datos.price);
        datos.img = '../img/' + req.file.filename;
        console.log(datos);
        console.log(req.file.filename);

        productsModel.createOne(datos);
        
        res.redirect('/');
    },

    getEditarEvento: (req, res) => {
        const eventos = productsModel.findAll();
        const id = Number(req.params.id);

        const eventoAMostrar = productsModel.findById(id);

        if(!eventoAMostrar){return res.send('Id invalido')}
        res.render('edicionEventos', { title: 'Editar', evento: eventoAMostrar });
    },

    putEditarEvento: (req, res) => {
        const id = Number(req.params.id);
        const newData = req.body;
        
        productsModel.updateById(id, newData);

        res.redirect('/');
    },

    getDetalleEventoAdmin: (req, res) => {

        res.render('detalleEventosAdmin', { title: 'Editar Evento'})
    },

    deleteDetalleEventoAdmin: (req, res) => {
        const id = Number(req.body.id);

        productsModel.deleteById(id);

        res.redirect('/');
    }
}

module.exports = productControllers;