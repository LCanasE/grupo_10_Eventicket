module.exports = (sequelize, dataTypes) => {

    let alias = 'User';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        user_type_id: {
            type: dataTypes.INTEGER
        },
        password: {
            type: dataTypes.STRING
        },
        check_password: {
            type: dataTypes.STRING
        },
        notifications: {
            type: dataTypes.INTEGER
        },
        terms_condition: {
            type: dataTypes.INTEGER
        },
    };

    let config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = models => {
        User.hasMany(models.Product, {
            as: "products",
            foreignKey: "user_creator_id",
        })

        User.hasMany(models.Cart, {
            as: "cart_user",
            foreignKey: "user_id",
        })
    }
    return User;
}