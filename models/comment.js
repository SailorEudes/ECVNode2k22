module.exports = function (sequelize, Sequalize) {
  var CommentSchema = sequelize.define(
    'Comment',
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
  return CommentSchema
}
