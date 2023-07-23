module.exports = (sequelize, DataTypes) => {

    let alias = "Ticket";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
    }

    let config = {
        tableName: 'ticket_type',
        timestamps: false
    }

    let Ticket = sequelize.define(alias, cols, config);

    Ticket.associate = models => {
        Ticket.belongsTo(models.Product, {
            as: "tickets",
            foreignKey: "product_id"
        })
    }
    
    return Ticket;
}