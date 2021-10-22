const model = require('./model')
const userModel = require('../user/model')

const resolvers = {
  Comment: {
    id: (comment) => comment.comment_id,
    content: (comment) => comment.comment_content,
    author: (comment) => userModel.byId(comment.user_id)
  },

  Query: {
    getComments: () => model.many()
  }
}

module.exports = resolvers