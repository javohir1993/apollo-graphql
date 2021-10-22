const { ApolloServer } = require('apollo-server')

const PORT = 4000

const user = require('./src/modules/user/index')
const post = require('./src/modules/post/index')
const comment = require('./src/modules/comment/index')

const server = new ApolloServer({
  modules: [
    user,
    post,
    comment
  ],
  context: ({ req }) => req.headers
})

server.listen(PORT, () => console.log(PORT))