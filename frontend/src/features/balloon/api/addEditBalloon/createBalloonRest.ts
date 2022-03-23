import axios from 'axios';
import { isMock } from '../../../../utils/constants';
import { Balloon } from '../../interface/balloonInterfaces';
import { mockCreateBalloon } from '../../mock/mockBalloon';
import { API_URL } from '../../reduxSlice/balloonSlice';



export const createBalloonRest = async (balloon: Balloon, token: String) => {
  if (isMock) {
    mockCreateBalloon(balloon, token);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + '/create', balloon, config);

  return response.data.balloon;
};
