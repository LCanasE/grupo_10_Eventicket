const fs = require('fs');
const path = require('path');

const model = {
    route: '../data/products.json',
    findAll: function(){
        // TRAER TODOS LOS PRODUCTOS

        const products = JSON.parse(fs.readFileSync(path.join(__dirname, this.route), 'utf-8'));

        return products
    },

    findById: function(id) {
        let products = this.findAll();

        let productFind = products.find(product => product.id === id);
        if(!productFind){ return res.send(`El evento con el id ${id} no se encontró`) }
        return productFind;

    },

    createOne: function(newProduct){
        let products = this.findAll();

        newProduct.id = products[products.length - 1].id + 1;

        products.push(newProduct);

        const productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);
    },

    deleteById: function(id){
        let products = this.findAll();

        products = products.filter(product => product.id !== id);

        let productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

        return products;
    },

    updateById: function(id, newData){
        let products = this.findAll();

        const indice = products.findIndex(product => product.id === id);

        const { img, name, date, place, price } = newData;

        products[indice] = {
            id: products[indice].id,
            img,
            name, 
            date, 
            place, 
            price
        }

        const productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

        return products;
    }
}


module.exports = model;