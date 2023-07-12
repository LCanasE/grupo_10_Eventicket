module.exports = (sequelize, dataTypes) => {

    let alias = "Ticket";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        amount: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.INTEGER
        },
        product_id: {
            type: dataTypes.INTEGER,
            foreignKey: true
        }
    }

    let config = {
        tableName: "ticket_type",
        timestamps: false
    }

    const Ticket = sequelize.define(alias, cols, config);

    Ticket.associate = models => {
        Ticket.belongsTo(models.Product, {
            as: "tickets",
            foreignKey: "product_id"
        })
    }

    return Ticket;
}