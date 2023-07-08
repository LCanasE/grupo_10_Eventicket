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
            type: dataTypes.INTEGER
        },
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);

    return Product;
}