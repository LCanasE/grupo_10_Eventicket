// Controladores páginas principales
const path = require("path");
let modelProducts = require('../models/productsModel');
const unidecode = require('unidecode');
const { Product } = require('../database/models');

const mainControllers = {

    getIndex: async (req, res) => {
        // let userData = req.session.user;
        // if (!userData){
        //     userData = {}
        // }
        
        let nombreEventoBuscado = req.query.buscadorTexto;
        let nombreCategoriaBuscado = req.query.buscadorCategoria;
        let nombreFechaBuscada = req.query.buscadorFecha;

        nombreFechaBuscada = nombreFechaBuscada ? nombreFechaBuscada.toLowerCase() : '';

        let productosSinModificar = modelProducts.findAll();
        let productos = modelProducts.findAll();
        try {
            await Product.findAll({
                // raw: true,
                include: [
                    {association: "tickets"},
                    {association: "categories"},
                ]
            })
            .then(products => {
                console.log(products);
                return res.render('home', {productos: products, productosSinModificar, title: 'Home'})
            })
        } catch (error) {
            console.log(error);
        }
        
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

        // res.render('home', {
        //     productos: products,
        //     productosSinModificar,
        //     title: 'Home'
        //     }) 
    },
    pruebaCrud: async (req, res) => {
        try {
            let products = await Product.findAll({
                raw: true,
                nest: true,
                include: [
                    {association: "tickets"},
                    {association: "categories"}
                ]
            });
            res.send('Funciona')
            console.log(products);
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = mainControllers;