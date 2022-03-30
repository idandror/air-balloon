import { MockedResponse } from '@apollo/client/testing';
import { REGISTER } from './registerGraphql';

export const registerQueryMock: MockedResponse<any>[] = [
  {
    request: {
      query: REGISTER,
      variables: {
        userName: 'moshe',
        name: 'moshe',
        password: '123456!@#',
      },
    },
    result: {
      data: {
        register: {
          userName: 'moshe',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOiIxMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.S3j_YZe5fd8gZt5JRBvlWIxv1aRL8supvvcQGIJgM_c',
        },
      },
    },
  },
  {
    request: {
      query: REGISTER,
      variables: { userName: 'moshe', name: 'moshe', password: '123456!@#' },
    },
    result: {
      data: {
        register: {
          userName: 'moshe',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOiIxMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.S3j_YZe5fd8gZt5JRBvlWIxv1aRL8supvvcQGIJgM_c',
        },
      },
    },
  },
];
