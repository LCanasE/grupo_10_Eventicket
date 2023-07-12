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
        
        // let productosSinModificar = modelProducts.findAll();
        let productos = modelProducts.findAll();

        let nombreEventoBuscado = req.query.buscadorTexto;
        let nombreCategoriaBuscado = req.query.buscadorCategoria;
        let nombreFechaBuscada = req.query.buscadorFecha;

        nombreFechaBuscada = nombreFechaBuscada ? nombreFechaBuscada.toLowerCase() : '';
        
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
        
        try {
            const productsBanner = await Product.findAll()
            await Product.findAll({
                raw: true,
            })
                .then(products => {
                    console.log(products);
                    return res.render('home', {
                        products,
                        productos,
                        productsBanner,
                        title: 'Home'});
                })
        } catch (error) {
            console.log(error);
        }
        // res.render('home', {
        //     productos,
        //     productosSinModificar,
        //     title: 'Home'
        //     }) 
    }
}


module.exports = mainControllers;