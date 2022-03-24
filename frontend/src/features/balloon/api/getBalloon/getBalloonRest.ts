import axios from "axios";
import { isMock } from "../../../../utils/constants";
import { mockGetBalloon } from "../mockBalloon";
import { API_URL } from "../../reduxSlice/balloonSlice";

export const getBalloonRest = async (id: string, token: String) => {
	if (isMock) {
	  mockGetBalloon(id, token);
	}
	const config = {
	  headers: {
		Authorization: `Bearer ${token}`,
	  },
	};
  
	const response = await axios.get(API_URL + '/get/' + id, config);
	return response;
  };