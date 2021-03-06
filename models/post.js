module.exports = function (sequelize, Sequalize) {
  var PostSchema = sequelize.define(
    'Post',
    {
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
