module.exports = (sequelize, DataTypes) => {

    let alias = "Category";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false,
    }


    let Category = sequelize.define(alias, cols, config);

    Category.associate = models => {
        Category.hasMany(models.Product, {
            as: "categories",
            foreignKey: "category_id"
        })
    }
    return Category;
}