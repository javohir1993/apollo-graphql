const { gql } = require('apollo-server')

const typeDefs = gql `
  type User {
    id: ID!
    username: String!
    posts: [Post!]!
  }

  type Token {
    id: ID!
    username: String!
    accessToken: String!
  }

  extend type Query {
    getUsers(id: ID): [User!]!
  }

  extend type Mutation {
    signUp(username: String! password: String!): Token,
    signIn(username: String! password: String!): Token,
    updateUser(username: String!): User,
    deleteUser: User,
  }
`

module.exports = typeDefs