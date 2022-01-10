module.exports = function (sequelize, Sequalize) {
  var RoleSchema = sequelize.define(
    'Role',
    {
      name: Sequalize.STRING,
    },
    {
      timestamps: false,
    },
  )
  return RoleSchema
}
