const { sign, verify } = require('../../../utils/jwt')

const model = require("./model")
const userModel = require('../user/model')
const commentModel = require('../comment/model')

const resolvers = {
  Post: {
    id: (post) => post.post_id,
    title: (post) => post.post_title,
    content: (post) => post.post_content,
    author: (post) => userModel.byId(post.user_id),
    comments: (post) => commentModel.byId(post.post_id)
  },

  Query: {
    getPosts: (_, { id, page, limit }) => {
      if(id) {
        return model.byPostId(id)
      }
      else if (page && limit) {
        return model.perPage(page, limit)
      }
      else {
        return model.many()
      }
    }
  },

  Mutation: {
    createPost: (_, { title, content }, { access_token }) => {
      try {
        const { user_id } = verify(access_token)
        return model.createPost(title, content, user_id)
      }
      catch({ message }) {
        throw new Error(message)
      }
    },

    updatePost: (_, { title, content, postId }, { access_token }) => {
      try {
        const { user_id } = verify(access_token)
        return model.updatePost(title, content, postId, user_id)
      }
      catch({ message }) {
        throw new Error(message)
      }
    },

    deletePost: (_, { postId }, { access_token } )=> {
      try {
        const { user_id } = verify(access_token)
        return model.deletePost(postId, user_id)
      }
      catch({ message }) {
        throw new Error(message)
      }
    }
  },

}

module.exports = resolvers