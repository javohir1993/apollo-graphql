const { gql } = require('apollo-server')

const typeDefs = gql `
  type Comment {
    id: ID!
    content: String!
    author: User!
  }

  extend type Query {
    getComments: [Comment!]!
  }

  extend type Mutation {
    createComment: Comment
  }
`

module.exports = typeDefs