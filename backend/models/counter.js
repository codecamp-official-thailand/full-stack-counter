module.exports = (sequelize, DataTypes) => {
  const Counter = sequelize.define(
    "counter",
    {
      current: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  Counter.associate = (models) => {
    Counter.belongsTo(models.user, { foreignKey: "user_id" });
  };

  return Counter;
};
