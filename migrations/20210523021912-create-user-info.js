'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
		  allowNull: false,
		  unique: true,
        type: Sequelize.STRING
      },
      username: {
		  allowNull: false,
        type: Sequelize.STRING
      },
      password: {
		  allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
	  token:{
	  	type: Sequelize.STRING
	  }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_infos');
  }
};