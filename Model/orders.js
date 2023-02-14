module.exports = (sequelize, Sequelize) => {
    const orders = sequelize.define("orders", {
      o_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      style_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      style_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      order_total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
  
    return orders;
  };