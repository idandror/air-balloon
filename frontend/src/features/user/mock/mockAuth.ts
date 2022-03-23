import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { User } from '../interface/userInterfaces';

const API_URL = 'http://localhost:5000/api/users';

//export const mock = new MockAdapter(axios);

const user: User = {
  userName: 'idan',
  password: '123456!@#',
};

export const mockLogin = (userData: User) => {
  const mock = new MockAdapter(axios);
  mock.onPost(API_URL + '/login').reply(() => {
    if (
      userData.userName === user.userName &&
      userData.password === user.password
    ) {
      return [200];
    } else {
      return [401, { message: 'username or password are incorrect' }];
    }
  });
};


export const mockRegister = (userData: User) => {
	const mock = new MockAdapter(axios);
	mock.onPost(API_URL + '/register', userData).reply(() => {
	  if (userData.userName && userData.password) {
		return [200, userData];
	  } else {
		return [401];
	  }
	});
  };