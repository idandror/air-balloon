import { gql } from 'apollo-server-core';

const typeDefs = gql`
  enum BalloonType {
    small
    medium
    big
    double
  }

  enum BalloonColor {
    Red
    Blue
    White
    Black
  }

  type Balloon {
    id: String!
    name: String!
    description: String!
    type: BalloonType!
    color: BalloonColor!
    longitude: Float!
    latitude: Float!
    altitude: Float!
  }

  input InputBalloon {
    id: String
    name: String!
    description: String!
    type: BalloonType!
    color: BalloonColor!
    longitude: Float!
    latitude: Float!
    altitude: Float!
  }

  type Query {
    getBalloons: [Balloon]!
    getBalloon(balloonId: String!): Balloon
  }

  type Mutation {
    addBalloon(balloon: InputBalloon!): Balloon!
  }
`;

export default typeDefs;
