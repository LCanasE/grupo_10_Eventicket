module.exports = (sequelize, dataTypes) => {

    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        date: {
            type: dataTypes.DATE
        },
        location: {
            type: dataTypes.STRING
        },
        addres: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        },
        sold_out: {
            type: dataTypes.INTEGER
        },
        user_creator_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
        },
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = models => {
        Product.hasMany(models.Ticket, {
            as: "tickets",
            foreignKey: "product_id"
        });

        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "category_id",
        });

        Product.belongsTo(models.User, {
            as: "products",
            foreignKey: "user_creator_id",
        })
    }

    return Product;
}