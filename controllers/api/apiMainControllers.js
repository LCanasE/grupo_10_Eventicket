const { Product, Category } = require("../../database/models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const allProducts = await Product.findAll({
        include: { association: "categories" },
      });
      const allFilterProducts = allProducts.map((product) => ({
        id: product.id,
        name: product.name,
        location: product.location,
        addres: product.addres,
        image: product.image,
        category: product.categories.name,
      }));
      const allCategories = await Category.findAll({
        include: { association: "products" },
      });
      const filterCategories = allCategories.map((category) => ({
        name: category.name,
        products: category.products.length,
      }));

      // filterCategories.forEach(element => {
      //     console.log(element.products.length);
      // })

      res.json({
        count: allFilterProducts.length,
        products: allFilterProducts,
        categoriesCount: allCategories.length,
        categories: filterCategories,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
