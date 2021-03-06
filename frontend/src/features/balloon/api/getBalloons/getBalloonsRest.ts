import axios from 'axios';
import { isMock } from '../../../../utils/constants';
import { mockGetBalloons } from '../mockBalloon';
import { API_URL } from '../../reduxSlice/balloonSlice';

export const getBalloonsRest = async (token: String) => {
  if (isMock) {
    return mockGetBalloons(token);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getAll', config);

  return response.data;
};
