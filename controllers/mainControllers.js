// Controladores páginas principales
const path = require("path");
let modelProducts = require('../models/productsModel');
const unidecode = require('unidecode');
const { Op } = require('sequelize');
const { Product } = require('../database/models');

const mainControllers = {

    getIndex: async (req, res) => {
        console.log("CONTROLLER", req.cookies.email);
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
                        title: 'Home',
                        error: {}});
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




    // Esta es el controller que maneja los pedidos de la barra de búsqueda
    search: async (req, res) => {
        // Primero se almacena en la constante from, el parametro "from" de la ruta que indica de que vista vino la petición. Esto sirve ya que la barra de búsqueda está implementada tanto en la "home" como en la vista "events".
        const from = req.params.from;

        // Se hace una desestructuración de los query strings que vienen de la barra de búsqueda "navBar".
        let { searchName, searchCategory, searchDate } = req.query

        // Se declara una constante que contiene los meses del año. Viene bien para comparar searchDate.
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        // Luego se plantea una estructura trycatch para comenzar con los pedidos a la base de datos.
        try {
            // Se define un objeto vacío. El código que viene abajo funciona como si fuera un switch.
            const whereClause = {};

            // Si searchName existe (es decir, se proporcionó un nombre en la búsqueda), se agrega una propiedad name al whereClause con un valor que representa la condición de búsqueda para el nombre. En este caso, se utiliza Op.like de Sequelize para buscar registros cuyo nombre coincida parcialmente con el valor de searchName
            if (searchName) {
                whereClause.name = { [Op.like]: `%${searchName}%` }
            }

            // Si searchDate existe, se búsca en la constante months el índice del mes ingresado por el usuario, como en la vista la información está escrita con la primera letra en mayúscula ("Julio"), se "normaliza" o iguala la información a como está en la constante y se le suma 1 ya que los arrays comienzan a contar desde 0.
            // Como la información de los meses en la base de datos está almacenada con dos dígitos, es decir, julio es igual a 07, e indexMonth devuelve un número de un solo dígito, es decir, julio es igual a 7, hay que igualarlos para poder compararlos. Entonces, si indexMonth es menos que 10 se le agrega un 0 adelante y si es mayor o igual se mantiene.
            // Por último a whereClause se le asigna un atributo name (este atributo es el mismo que se tiene en la columna de la base de datos) y se le asigna a name un objeto que va a servir para el where final cuyo objetivo es que se filtre por la columna name y se traiga todos aquellos name que contengan la información ingresada por el usuario.
            // ACLARACIÓN: Op.substring es un operador de Sequelize que se utiliza en consultas para buscar una cadena que contenga una subcadena específica como en este caso sería 07 del mes.
            if (searchDate) {
                const indexMonth = months.indexOf(searchDate.toLowerCase()) + 1;
                const formattedToSearch = indexMonth < 10 ? `0${indexMonth}` : `${indexMonth}`;
                whereClause.date = { [Op.substring]: `-${formattedToSearch}-` }
            }

            // Si searchCategory existe, a whereClause se le asigna un atributo llamado category_id que contendrá el número de searchCategory.
            // ACLARACIÓN: si bien en la vista los usuarios ven y eligen una categoría por su nombre. Detrás el value de cada categoría es su id. Cualquier cosa mirar el parcial navBar y queda más claro.
            if (searchCategory){
                whereClause.category_id = searchCategory;
            }

            const productsBanner = await Product.findAll();

            // Object.keys es una función que se utiliza para extraer todas las "keys" (claves o propiedades) de un objeto. Acá se pregunta si whereClause contiene información o no. En caso de que no, se termina la ejecución con un res.redirect a la página donde está el usuario.
            if(Object.keys(whereClause).length === 0){
                console.log("VACIO!!");
                return res.redirect('./');
            }
            let productos = modelProducts.findAll();

            // Se realiza un pedido asíncrono a la base de datos para que traiga todos los productos y se le indica cuáles se quieren traer con el where. Aquí se retoma el whereClause. Supongamos que el usuario escribió "Babasonicos", entonces como el whereClause es name = { [Op.like]: `%${searchName}%` } se trae únicamente el producto cuyo name sea "Babasonicos". Además los productos traen su categoría y su tipo de ticket. La categoría sirve para realizar la búsqueda y el ticket más que nada para la información que se renderiza en la vista.
            await Product.findAll({
                where: whereClause,
                include: [
                    {association: "tickets"},
                    {association: "categories"}
                ]
            })
            .then(products => {
                // Aquí se retoma el from de la primera línea del controlador. El objetivo es que se renderice la vista en la que está el usuario. Si from es "home", entonces cuando realice una búsqueda se renderizará la home. Si from es "events", entonces cuando realice una búsqueda se renderizará events. Cada estructura if pregunta si products está vacío y en tal renderiza la vista con el mensaje de error. Si no, muestra lo que se encontró.
                if (from === 'home') {
                    if (products.length === 0) {
                        return res.render('home', { products, title: 'Eventicket', productsBanner, productos, error: {message: "No se encontraron productos"} });
                    }
                    return res.render('home', { products, title: 'Eventicket', productsBanner, productos, error: {} });
                } else if (from === 'events') {
                    if (products.length === 0) {
                        return res.render('events', { products, title: 'Eventicket', productsBanner, productos, error: {message: "No se encontraron productos"} });
                    }
                    return res.render('events', { products, title: 'Eventicket', productsBanner, productos, error: {} });
            }
        })
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = mainControllers;