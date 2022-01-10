module.exports = function (sequelize, Sequalize) {
  var UserSchema = sequelize.define(
    'User',
    {
      lastname: Sequalize.STRING,
      firstname: Sequalize.STRING,
      email: Sequalize.STRING,
      username: Sequalize.STRING,
      link: Sequalize.STRING,
    },
    {
      timestamps: false,
    },
  )
  return UserSchema
}
