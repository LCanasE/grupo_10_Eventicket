module.exports = (sequelize, dataTypes) => {

    let alias = "Cart";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
        },
        product_id: {
            type: dataTypes.INTEGER,
            foreignKey: true
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        ticket_type_id: {
            type: dataTypes.INTEGER
        },
        bought: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "user_product_cart",
        timestamps: false
    }

    let Cart = sequelize.define(alias, cols, config);

    Cart.associate = models => {

        Cart.belongsToMany(models.User, {
            as: "cart_user",
            through: "user_id",
        })

        Cart.belongsToMany(models.Product, {
            as: "cart_product",
            through: "product_id",
        })
    }
    return Cart
}