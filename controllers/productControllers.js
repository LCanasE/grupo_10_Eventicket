// Controlador de productos
const path = require('path');
const { validationResult } = require('express-validator');
const fs = require('fs');

let modelProductos = require('../models/productsModel');

const productControllers = {

    getEventsDetails: (req, res) => {
    let id = Number(req.params.id);
    let productos = modelProductos.findAll();
    let productosSinModificar = modelProductos.findAll();
    let productoBuscado = modelProductos.findById(id);
    
    res.render('eventsDetails', {
        productoBuscado,
        productos,
        productosSinModificar,
        title: 'Detalle'})
    },

    getCart: (req, res) => {
    let id = Number(req.body.id);
    let productoBuscado = modelProductos.findById(id);
    res.render('cart', {
        productoBuscado,
        title: 'Carrito'})
    },

    postCart: (req, res) => {
        console.log(req.body)
    },

    getEvents: (req, res) => {
    let productos = modelProductos.findAll()
    res.render('events', {
        productos,
        title: 'Eventos'})
    },

    getCreateEvent: (req, res) => {
    res.render('createEvents', { title: 'Crear', errors: {}, oldData: {}, imageName: false})
    },

    postCreateEvent: (req, res) => {
        let validation = validationResult(req);
        let eventoNuevo = req.body;
        console.log(eventoNuevo);
        eventoNuevo.img = '';
        console.log(req.file);
        if (req.file) {
            eventoNuevo.img = req.file.filename;
        }

        // if (req.file && (eventoNuevo.nombre === '' || eventoNuevo.fecha === '' || eventoNuevo.ubicacion === '' || eventoNuevo.direccion === '' || eventoNuevo.tipoEntrada === '' || eventoNuevo.precio === '')) {
        //     let categoria = eventoNuevo.categoria.toLowerCase();
        //     const categoriaCarpeta = {
        //     'deportes': 'deportes',
        //     'recitales': 'recitales',
        //     'stand up': 'standUp',
        //     'conferencias': 'conferencias',
        //     'obras de teatro': 'obrasTeatro'
        //     };
        //     let carpeta = categoriaCarpeta[categoria] || '';
        //     const imagePath = path.join(__dirname, `../public/img/events/${carpeta === '' ? '' : `${carpeta}/`}${req.file.filename}`);
        //     console.log('RUTA DE LA IMAGEN:' + imagePath);
        //     fs.unlinkSync(imagePath);
        // }

        if(validation.errors.length > 0){
            // console.log(eventoNuevo);
            // console.log(validation.errors);
            return res.render('createEvents', { 
                errors: validation.mapped(),
                oldData: eventoNuevo,
                imageName: req.file ? req.file.filename : '',
                title: 'Crear'  })
        };

        if(!req.body.fecha){
            return res.render('createEvents', {title:'Crear'});
        } else {

        let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']; 

        let mesDelEvento = Number(eventoNuevo.fecha.split('-')[1]);
        let diaEvento = eventoNuevo.fecha.split('T')[0].split('-')[2];
        let indiceMes = mesDelEvento - 1;
        let nombreMes = meses[indiceMes];
        let horario = eventoNuevo.fecha.split('T')[1].split(':')[0];

        Number(diaEvento.split('')[0]) === 0 ? diaEvento = diaEvento.split('')[1] : diaEvento;
        Number(horario.split('')[0]) === 0 ? horario = horario.split('')[1] : horario;


        let imageRoute = '../img/events/';
        switch(req.body.categoria){
            case 'Recitales':
                imageRoute += 'recitales';
                break;
            case 'Deportes':
                imageRoute += 'deportes';
                break;
            case 'Stand Up':
                imageRoute += 'standUp';
                break;
            case 'Obra de teatro':
                imageRoute += 'obraTeatro';
                break;
            case 'Conferencia':
                imageRoute += 'conferencias';
                break;
            default:
                imageRoute = '../img/events';
                break;
        }

        eventoNuevo.img = `${imageRoute}/${req.file.filename}`;
        eventoNuevo.eliminado = "false";
        eventoNuevo.agotado = "false";
        eventoNuevo.fecha = `${diaEvento} de ${nombreMes} - ${horario} horas`;
        eventoNuevo.precio = Number(eventoNuevo.precio);
        eventoNuevo.eliminado = eventoNuevo.eliminado === "false" ? false : true;
        eventoNuevo.agotado = eventoNuevo.agotado === "false" ? false : true;

        console.log(eventoNuevo);

        modelProductos.createOne(eventoNuevo);
        res.redirect('/');
        }
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

    putEditEvent: (req, res) => {
        let id = Number(req.params.id);
        let nuevosDatos = req.body;
        nuevosDatos.img = req.file ? req.file.filename : req.body.originalImg;
        nuevosDatos.precio = Number(nuevosDatos.precio);
        nuevosDatos.eliminado = Boolean(nuevosDatos.eliminado)
        nuevosDatos.agotado = Boolean(nuevosDatos.agotado)
        modelProductos.updateById(id, nuevosDatos);

        res.redirect('/')
    },

    deleteEvent: (req, res) => {
        let id = Number(req.params.id);

        modelProductos.deleteByID(id);
        res.redirect('/');
    },

    getAdminEventsDetail: (req, res) =>
    res.render('adminEventsDetail'),
}

module.exports = productControllers;