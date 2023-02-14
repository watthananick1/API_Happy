module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_fname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_lname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_status: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return users;
  };