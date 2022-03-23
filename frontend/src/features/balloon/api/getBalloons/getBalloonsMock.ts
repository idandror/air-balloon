import { gql } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import data from '../../mock/data';
import { GET_BALLOONS } from './getBalloonsGraphql';



export const GET_BALLOON = gql`
  query getBalloon($balloonId: String!) {
    getBalloon(balloonId: $balloonId) {
      id
      name
      description
      type
      color
      longitude
      altitude
      latitude
    }
  }
`;

export const getBalloonsQueryMock: MockedResponse<any>[] = [
  {
    request: {
      query: GET_BALLOONS,
    },
    result: {
      data: { balloons: { data } },
    },
  },
  {
    request: {
      query: GET_BALLOONS,
    },
    result: {
      data: {
        getBalloons: {
          status: 200,
          data: data,
        },
      },
    },
  },
];
