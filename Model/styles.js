module.exports = (sequelize, Sequelize) => {
    const styles = sequelize.define("styles", {
        style_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      style_desc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      style_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      style_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
  
    return styles;
  };