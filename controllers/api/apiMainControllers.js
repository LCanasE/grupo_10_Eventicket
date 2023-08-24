const { Product, Category } = require('../../database/models');

module.exports = {
    getAll: async (req, res) => {
        const url = 'http://localhost:3000/api/products';

        try {
            const allCategories = await Category.findAll({
                include: { association: "products" }
            });
            const filterAllCategories = allCategories.map(category => ({
                name: category.name,
                products: category.products.length,
            }))
            const allProducts = await Product.findAll({
                include: { association: "categories" }
            });
            const filterAllProducts = allProducts.map(product => ({
                id: product.id,
                name: product.name,
                date: product.date,
                location: product.location,
                addres: product.addres,
                image: product.image,
                category: product.categories,
                detail: `${url}/${product.id}/eventDetails`
            }))
            res.json(
                {
                    url: url,
                    count: allProducts.length,
                    countByCategories: {
                        categoriesCount: filterAllCategories.length,
                        allCategories: filterAllCategories,
                    },
                    results: filterAllProducts
                })
        } catch (error) {
            console.log('API MAIN CONTROLLER', error);
        }
    }
}