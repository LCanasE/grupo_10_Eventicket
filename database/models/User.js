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

    return User;
}