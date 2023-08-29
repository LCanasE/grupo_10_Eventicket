const { Product } = require('../../database/models');

module.exports = {
    getOne: async (req, res) => {
        try {
            const findProduct = await Product.findByPk(req.params.id, {
                include: [{ association: "categories" }, { association: "tickets" }]
            })

            const finalProduct = [findProduct].map(product => ({
                id: product.id,
                name: product.name,
                location: product.location,
                addres: product.addres,
                image: product.image,
                category: product.categories.name,
                tickets: {
                    count: product.tickets.length,
                    result: product.tickets }
            }))
            res.json(finalProduct);
        } catch (error) {
            console.log(error);
        }
    }
}