const fs = require('fs');
const path = require('path');


let productos = {
    routes: '../data/productos.json',

    findAll: function () {
        let productos = JSON.parse(fs.readFileSync(path.join(__dirname, this.routes),"UTF-8"))
        return productos
    },

    findById: function(id) {
        let productos = this.findAll();
        let productoBuscado = productos.find(producto => producto.id === id)
        if (!productoBuscado) {
            productoBuscado = null;
        }
        return productoBuscado;
    },

    createOne: function (newProduct) {
        let productos = this.findAll();
        newProduct.id = productos[productos.length - 1 ].id + 1;
        productos.push(newProduct);
        const productsJSON = JSON.stringify(productos);
        fs.writeFileSync(path.join(__dirname, this.routes), productsJSON)
    },

    deleteByID: function (id) {
        let productos = this.findAll();
        let productoBuscado = productos.find(producto => producto.id === id);
        productoBuscado ? productoBuscado.eliminado = true : productoBuscado = null;
        return productoBuscado;
        // productos = productos.filter(producto => producto.id !== id);
        // const productsJSON = JSON.stringify(productos);
        // fs.writeFileSync(path.join(__dirname, this.routes), productsJSON)
        // return productos;
    },

    updateById: function (id, newData) {
        let productos = this.findAll();
        const indice = productos.findIndex(producto => producto.id === id);
        const {nombre, fecha, ubicacion, tipoEntrada, precio, cantidadEntradas, categoria, img, eliminado, agotado} = newData;
        productos[indice] = {id:productos[indice].id, nombre, fecha, ubicacion, tipoEntrada, precio, cantidadEntradas, categoria, img, eliminado, agotado};

        const productsJSON = JSON.stringify(productos);
        fs.writeFileSync(path.join(__dirname, this.routes), productsJSON)
        return productos;

    }
}

module.exports = productos;