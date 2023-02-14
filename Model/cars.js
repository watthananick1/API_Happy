module.exports = (sequelize, Sequelize) => {
    const Cars = sequelize.define("Cars", {
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      car_brand: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      car_size: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      car_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
  
    return Cars;
  };