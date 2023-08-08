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
            type: dataTypes.INTEGER,
            foreignKey: true,
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

        Cart.belongsTo(models.User, {
            as: "cart_user",
            foreignKey: "user_id",
        })

        Cart.belongsTo(models.Product, {
            as: "cart_product",
            foreignKey: "product_id",
        })

        Cart.belongsTo(models.Ticket, {
            as: "cart_tickets",
            foreignKey: "ticket_type_id",
        })
    }
    return Cart
}