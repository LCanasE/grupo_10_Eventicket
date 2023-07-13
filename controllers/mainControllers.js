// Controladores páginas principales
const path = require("path");
let modelProducts = require('../models/productsModel');
const unidecode = require('unidecode');
const { Op } = require('sequelize');
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
                // raw:true,
                nest: true,
                include: [
                    {association: "tickets"},
                    {association: "categories"}
                ]
            })
                .then(products => {
                    // console.log(products);
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
    },

    search: async (req, res) => {
        let { searchName, searchCategory, searchDate } = req.query

        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        try {

            const whereClause = {};

            if (searchName) {
                whereClause.name = { [Op.like]: `%${searchName}%` }
            }

            if (searchDate) {
                const indexMonth = months.indexOf(searchDate.toLowerCase()) + 1;
                const formattedToSearch = indexMonth < 10 ? `0${indexMonth}` : `${indexMonth}`;
                whereClause.date = { [Op.substring]: `-${formattedToSearch}-` }
            }

            if (searchCategory){
                whereClause.category_id = searchCategory;
            }

            const productsBanner = await Product.findAll()
            if(Object.keys(whereClause).length === 0){
                console.log("VACIO!!");
                return res.redirect('./');
            }
            let productos = modelProducts.findAll();
            await Product.findAll({
                where: whereClause,
                include: [
                    {association: "tickets"},
                    {association: "categories"}
                ]
            })
            .then(products => {
                products.forEach(product => {
                    console.log(product.dataValues.categories.dataValues.name);
                })
                return res.render( 'home', { products, title: 'Eventicket', productsBanner, productos });
            })
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = mainControllers;