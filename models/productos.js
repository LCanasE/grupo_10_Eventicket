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
    }



}

module.exports = productos;