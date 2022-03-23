import { gql } from 'apollo-server-core';

const typeDefs = gql`
  type User {
    userName: String!
    token: String!
  }

  type Mutation {
    login(userName: String!, password: String!): User!
    register(userName: String!, name: String!, password: String!): User!
  }
`;

export default typeDefs;
