import axios from 'axios';
import { isMock } from '../../../../utils/constants';
import { User } from '../../interface/userInterfaces';
import { mockRegister } from '../../mock/mockAuth';
import { API_URL_REST } from '../../reduxSlice/authReducers';

//Register user
export const registerRest = async (userData: User) => {
  if (isMock) {
    mockRegister(userData);
    userData.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWQiOiIxMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.S3j_YZe5fd8gZt5JRBvlWIxv1aRL8supvvcQGIJgM_c';
    return userData;
  }
  const response = await axios.post(API_URL_REST + '/register', userData);

  return response.data;
};
