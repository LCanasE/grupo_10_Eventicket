module.exports = (sequelize, DataTypes) => {
    let alias = "Product";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        },
        location: {
            type: DataTypes.STRING
        },
        addres: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        image: {
            type: DataTypes.STRING,
        },
        deleted: {
            type: DataTypes.INTEGER,
        },
        sold_out: {
            type: DataTypes.INTEGER,
        },
        user_creator_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
    }

    let config = {
        tableName: "products",
        timestamps: false,
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
        })
    }
    return Product;
}