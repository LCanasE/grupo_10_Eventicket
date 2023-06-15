// Controlador de productos
const path = require('path');
let modelProductos = require('../models/productsModel');


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

        let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']; 

        let eventoNuevo = req.body;
        let mesDelEvento = Number(eventoNuevo.fecha.split('-')[1]);
        let diaEvento = eventoNuevo.fecha.split('T')[0].split('-')[2];
        let indiceMes = mesDelEvento - 1;
        let nombreMes = meses[indiceMes];
        let horario = eventoNuevo.fecha.split('T')[1].split(':')[0];

        Number(diaEvento.split('')[0]) === 0 ? diaEvento = diaEvento.split('')[1] : diaEvento;
        Number(horario.split('')[0]) === 0 ? horario = horario.split('')[1] : horario;

        let imageRoute = '../img/events/';
        switch(req.body.categoria){
            case 'Recital':
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