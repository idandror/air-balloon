import { ApolloClient, gql } from "@apollo/client";

export const GET_BALLOON = gql`
  query getBalloon($balloonId: String!) {
    getBalloon(balloonId: $balloonId) {
      id
      name
      description
      type
      color
      longitude
      altitude
      latitude
    }
  }
`;


export const getBalloonGraphql = async (client: ApolloClient<object>) => {
	const { data } = await client.query({ query: GET_BALLOON });
	return data;
  };

