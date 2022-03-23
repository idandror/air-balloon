import { MockedResponse } from '@apollo/client/testing';
import { Balloon } from '../../interface/balloonInterfaces';
import { CREATE_BALLOON } from './createBalloonGraphql';

export const createBalloonQueryMock: MockedResponse<{ balloon: Balloon }>[] = [
  {
    request: {
      query: CREATE_BALLOON,
      variables: {
        name: 'apollo7',
      },
    },
    result: {
      data: {
        balloon: {
          id: '6',
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
      query: CREATE_BALLOON,
      variables: {
        name: 'apollo7',
      },
    },
    result: {
      data: {
        balloon: {
          id: '7',
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
