module.exports = function (sequelize, Sequalize) {
  var CommentSchema = sequelize.define(
    'Comment',
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
  return CommentSchema
}
