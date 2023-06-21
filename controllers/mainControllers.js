// Controladores páginas principales
const path = require("path");
let modelProducts = require('../models/productsModel');
const unidecode = require('unidecode');

const mainControllers = {

    getIndex:(req, res) => {
        let userData = req.session.user;
        if(!userData){
            userData = {}
        }

        let nombreEventoBuscado = req.query.buscadorTexto;
        let nombreCategoriaBuscado = req.query.buscadorCategoria;
        let nombreFechaBuscada = req.query.buscadorFecha;

        nombreFechaBuscada = nombreFechaBuscada ? nombreFechaBuscada.toLowerCase() : '';

        let productosSinModificar = modelProducts.findAll();
        let productos = modelProducts.findAll();
        
        if(nombreEventoBuscado){
            const nombreEventoBuscadoSinAcentos = unidecode(nombreEventoBuscado);

            productos = productos.filter(producto => {
                const nombreProductoSinAcento = unidecode(producto.nombre);
                return nombreProductoSinAcento.toLowerCase().includes(nombreEventoBuscadoSinAcentos.toLowerCase());
            });
        }
        if(nombreCategoriaBuscado){
            productos = productos.filter(producto => producto.categoria === nombreCategoriaBuscado);
        }
        if(nombreFechaBuscada){
            productos = productos.filter(producto => producto.fecha.split(' ')[2] == nombreFechaBuscada);
        } 

        if(productos.length === 0){
            return res.redirect('/');
        }

        res.render('home', {
            productos,
            productosSinModificar,
            title: 'Home',
            userData}) 
    }
}


module.exports = mainControllers;