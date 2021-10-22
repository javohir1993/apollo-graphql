const { gql } = require('apollo-server')

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  extend type Query {
    getPosts(id: ID page: Int limit: Int): [Post!]!
  }

  extend type Mutation {
    createPost(title: String! content: String!): Post

    updatePost(title: String content: String! postId: ID!): Post

    deletePost(postId: ID!): Post
  }
`

module.exports = typeDefs