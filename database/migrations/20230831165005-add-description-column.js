'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return await queryInterface.addColumn('products', 'description', {
        type: Sequelize.INTEGER 
      });
  },

  async down (queryInterface, Sequelize) {
           //   return await queryInterface.removeColumn('products', 'description');
  }
};
