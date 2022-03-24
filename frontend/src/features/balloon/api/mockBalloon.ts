import MockAdapter from 'axios-mock-adapter';

import data from '../mock/data';
import {
  CREATE_BALLOON_ERROR,
  CREATE_BALLOON_ERROR_MESSAGE,
  CREATE_BALLOON_ERROR_NUMBER,
  GET_BALLOONS_ERROR,
  GET_BALLOONS_ERROR_MESSAGE,
  GET_BALLOONS_ERROR_NUMBER,
} from '../constants/balloonConstants';
import axios from 'axios';
import { Balloon } from '../interface/balloonInterfaces';

const API_URL = 'http://localhost:5000/api/balloons';

const tempToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOiIxMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.S3j_YZe5fd8gZt5JRBvlWIxv1aRL8supvvcQGIJgM_c';

export const mockCreateBalloon = (balloon: Balloon, token: String) => {
  const mock = new MockAdapter(axios);
  mock.onPost(API_URL + '/create', balloon).reply(() => {
    if (!CREATE_BALLOON_ERROR) {
      if (token === tempToken) {
        balloon.id = '6';

        data.push(balloon);
        return [200, { balloon }];
      }
    }
    return [
      401,
      {
        statusCode: CREATE_BALLOON_ERROR_NUMBER,
        message: CREATE_BALLOON_ERROR_MESSAGE,
      },
    ];
  });
};

export const mockEditBalloon = (balloon: Balloon, token: String) => {
  const mock = new MockAdapter(axios);
  mock.onPut(API_URL + '/edit', balloon).reply(() => {
    if (token === tempToken) {
      let idx;
      data.forEach((bal, index) => {
        if (bal.id === balloon.id) {
          idx = index;
        }
      });
      if (idx || idx === 0) {
        data[idx] = balloon;
        return [200, { balloon }];
      }
    }
    return [401, { statusCode: 401, message: 'name error' }];
  });
};

export const mockGetBalloons = (token: String) => {
  const mock = new MockAdapter(axios);
  mock.onGet(API_URL + '/getAll').reply(() => {
    if (!GET_BALLOONS_ERROR) {
      if (token === tempToken) {
        return [200, { data, statusCode: 200 }];
      }
    }
    return [
      401,
      {
        statusCode: GET_BALLOONS_ERROR_NUMBER,
        message: GET_BALLOONS_ERROR_MESSAGE,
      },
    ];
  });
};

export const mockGetBalloon = (id: string, token: String) => {
  const mock = new MockAdapter(axios);
  mock.onGet(API_URL + '/get/' + id).reply(() => {
    if (!GET_BALLOONS_ERROR) {
      if (token === tempToken) {
        const balloon = data[Number(id)];
        return [200, { balloon, statusCode: 200 }];
      }
    }
    return [
      401,
      {
        statusCode: GET_BALLOONS_ERROR_NUMBER,
        message: GET_BALLOONS_ERROR_MESSAGE,
      },
    ];
  });
};
