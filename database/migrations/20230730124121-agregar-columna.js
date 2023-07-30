'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addColumn('user_product_cart', 'quantity', {
      type: Sequelize.INTEGER 
    });
  },

  async down (queryInterface, Sequelize) {
    //   return await queryInterface.removeColumn('user_product_cart', 'quantity');
  }
};
