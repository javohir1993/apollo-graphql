const { sign, verify } = require('../../../utils/jwt')

const model = require('./model')
const postsModel = require('../post/model')

const resolvers = {

  User: {
    id: (user) => user.user_id,
    posts: (user) => postsModel.byUserId(user.user_id)
  },

  Token: {
    id: (user) => user.user_id,
    accessToken: (user) => sign(user)
  },

  Query: {
    getUsers: (_, { id }) => {
      if (id) {
        return [model.byId(id)]
      }
      else {
        return model.many()
      }
    }
  },

  Mutation: {
    signUp: (_, { username, password }) => model.signup(username, password),

    signIn: (_, { username, password }) => model.signin(username, password),

    updateUser: (_, { username }, { access_token }) => {

      try {
        const { user_id } = verify(access_token)
        return model.updateUser(user_id, username)
      }
      catch({ message }) {
        throw new Error(message)
      }
    },

    deleteUser: (_, __, { access_token }) => {
      try {
        const { user_id } = verify(access_token)
        return model.delUser(user_id)
      }
      catch({ message }) {
        throw new Error(message)
      }
    },
  }
}

module.exports = resolvers