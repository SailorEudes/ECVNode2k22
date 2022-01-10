module.exports = function (sequelize, Sequalize) {
  var RoleSchema = sequelize.define(
    'Role',
    {
      id: Sequalize.INTEGER,
      name: Sequalize.STRING,
    },
    {
      timestamps: false,
    },
  )
  return RoleSchema
}
