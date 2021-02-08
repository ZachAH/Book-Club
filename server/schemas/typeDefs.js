// import the gql function
const { gql } = require('apollo-server-express');

//create typeDefs and mutation
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        emial: String
        bookCount: Integer
        savedBooks: [Books]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description : String
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(userNamer: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }
    

`;







//export typeDefs
module.exports = typeDefs;