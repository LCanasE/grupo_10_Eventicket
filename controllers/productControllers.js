// Controlador de productos
const path = require('path');
const { validationResult } = require('express-validator');
const { Product, Ticket } = require('../database/models');

let modelProductos = require('../models/productsModel');

const productControllers = {

    getEventsDetails: async (req, res) => {
        try {
            const productsBanner = await Product.findAll()
            await Product.findByPk(req.params.id, {
                // raw: true,
                include: [ 
                    {
                    model: Ticket,
                    as: "tickets",
                    // order: [["price", "ASC"]]
                    }
                ],
            })
                .then((product) => {
                    product.tickets.sort((a, b) => a.price - b.price);
                    console.log(product);
                    res.render('eventsDetails', {
                        product,
                        title: 'Detalle',
                        productsBanner
                    })});
        } catch (error) {
            console.log(error);
        }
    // let id = Number(req.params.id);
    // let productos = modelProductos.findAll();
    // let productoBuscado = modelProductos.findById(id);
    
    // res.render('eventsDetails', {
    //     // productoBuscado,
    //     productos,
    //     // productosSinModificar,
    //     title: 'Detalle'})
    },

    getCart: (req, res) => {
    let productos = modelProductos.findAll();
    let id = Number(req.query.id);
    let productoBuscado = modelProductos.findById(id);
    console.log('PRODUCTO BUSCADO', productoBuscado);
    res.render('cart', {
        productoBuscado,
        productos,
        title: 'Carrito'})
    },

    postCart: (req, res) => {
        console.log(req.body)
    },

    getEvents: async (req, res) => {
        try {
            await Product.findAll({
                raw: true
            })
                .then(products => {
                    console.log(products);
                })
        } catch (error) {
            console.log(error);
        }

    let productos = modelProductos.findAll()
    res.render('events', {
        productos,
        title: 'Eventos'})
    },

    getCreateEvent: (req, res) => {
    res.render('createEvents', {
        title: 'Crear',
        errors: {}, 
        oldData: {}, 
        imageName: false, 
        errorExtensionImagen: {}, 
        reqFile: req.file,
        errorImg: {},
        errorInput: {} })
    },

    postCreateEvent: (req, res) => {
        let validation = validationResult(req);
        let eventoNuevo = req.body;

        if(validation.errors.length > 0){
            return res.render('createEvents', { 
                errors: validation.mapped(),
                oldData: eventoNuevo,
                imageName: req.file ? req.file.filename : '',
                title: 'Crear',
                errorExtensionImagen: {},
                reqFile: req.file,
                errorImg: {} });
        };

        if (req.file) {
            eventoNuevo.img = req.file.filename;
        }

        if(!req.body.fecha){
            return res.render('createEvents', {title:'Crear'});
        } else {

        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('createEvents',{
                errors: resultValidation.errors,
                oldData: req.body,
                title: 'Crear'
            });
        }
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
            case 'Obras de teatro':
                imageRoute += 'obraTeatro';
                break;
            case 'Conferencias':
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

        // console.log(eventoNuevo);

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
            case 'Obras de teatro':
                imageRoute += 'obraTeatro';
                break;
            case 'Conferencias':
                imageRoute += 'conferencias';
                break;
            default:
                imageRoute = '../img/events';
                break;
        }

        nuevosDatos.img = req.file ? `${imageRoute}/${req.file.filename}` : req.body.originalImg;
        nuevosDatos.precio = Number(nuevosDatos.precio);
        nuevosDatos.eliminado = nuevosDatos.eliminado === "false" ? false : true;
        nuevosDatos.agotado = nuevosDatos.agotado === "false" ? false : true;
        modelProductos.updateById(id, nuevosDatos);
        console.log(nuevosDatos);
        console.log(req.file);
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