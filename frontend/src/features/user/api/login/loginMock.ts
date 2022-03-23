import { MockedResponse } from '@apollo/client/testing';
import { LOGIN } from './loginGraphql';



export const loginQueryMock: MockedResponse<any>[] = [
  {
    request: {
      query: LOGIN,
      variables: {
        userName: 'idan',
        password: '123456!@#',
      },
    },
    result: {
      data: {
        login: {
          status: 200,
          user: {
            userName: 'idan',
            password: '123456!@#',
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOiIxMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.S3j_YZe5fd8gZt5JRBvlWIxv1aRL8supvvcQGIJgM_c',
          },
        },
      },
    },
  },
  {
    request: {
      query: LOGIN,
      variables: { userName: 'idan', password: '123456!@#' },
    },
    result: {
      data: {
        login: {
          status: 200,
          user: {
            userName: 'idan',
            password: '123456!@#',
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOiIxMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.S3j_YZe5fd8gZt5JRBvlWIxv1aRL8supvvcQGIJgM_c',
          },
        },
      },
    },
  },
];
