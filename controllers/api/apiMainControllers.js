const { Product } = require('../../database/models');

module.exports = {
    getAll: async (req, res) => {
        try {            
            const allProducts = await Product.findAll();
            res.json(
                {
                    meta: {
                        url: 'http://localhost:3000/api/products',
                        total: allProducts.length
                    },
                    results: allProducts
                })
        } catch (error) {
            console.log('API MAIN CONTROLLER', error);
        }
    }
}