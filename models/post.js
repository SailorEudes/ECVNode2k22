module.exports = function (sequelize, Sequalize) {
  var PostSchema = sequelize.define(
    'Post',
    {
      id: Sequalize.INTEGER,
      title: Sequalize.STRING,
      content: Sequalize.TEXT,
      date: Sequalize.DATE,
      author: Sequalize.STRING,
    },
    {
      timestamps: false,
    },
  )
  return PostSchema
}
