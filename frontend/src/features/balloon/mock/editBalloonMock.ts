import { gql } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { Balloon } from '../interface/balloonInterfaces';

export const EDIT_BALLOON = gql`
  mutation editBalloon($name: String!) {
    balloon(name: $name) {
      id
      name
      description
      type
      color
      longitude
      latitude
    }
  }
`;

export const editBalloonQueryMock: MockedResponse<{balloon:Balloon}>[] = [
  {
    request: {
      query: EDIT_BALLOON,
      variables: {
        name: 'apollo7',
      },
    },
    result: {
      data: {
        balloon: {
          id: '3',
          name: 'apollo6',
          description: 'asdjaidhas',
          type: 'big',
          color: 'White',
          longitude: 34.3434,
          latitude: 32.5456,
          altitude: 1500,
        },
      },
    },
  },
  {
    request: {
      query: EDIT_BALLOON,
      variables: {
        name: 'apollo7',
      },
    },
    result: {
      data: {
        balloon: {
          id: '4',
          name: 'apollo7',
          description: 'asdjaidhas',
          type: 'big',
          color: 'White',
          longitude: 34.3434,
          latitude: 32.5456,
          altitude: 1500,
        },
      },
    },
  },
];
