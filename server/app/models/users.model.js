module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return users;
  };