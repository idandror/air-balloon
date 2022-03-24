import axios from 'axios';
import { Balloon } from '../interface/balloonInterfaces';


const API_URL = 'http://localhost:5000/api/balloons';



export const editBalloon = async (balloon: Balloon, token: String) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/edit', balloon, config);

  return response.data;
};


const balloonReducer = {
  editBalloon,
};

export default balloonReducer;
