import { ApolloClient, gql } from "@apollo/client";

export const GET_BALLOONS = gql`
  query getBalloons {
    getBalloons {
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


export const getBalloonsGraphql = async (client: ApolloClient<object>) => {
	const { data } = await client.query({
	  query: GET_BALLOONS,
	  fetchPolicy: 'network-only',
	});
  
	return data.getBalloons;
  };