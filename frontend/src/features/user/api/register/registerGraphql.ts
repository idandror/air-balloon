import { ApolloClient, gql } from "@apollo/client";
import { User } from "../../interface/userInterfaces";


export const REGISTER = gql`
  mutation Register($userName: String!, $name: String!, $password: String!) {
    register(userName: $userName, name: $name, password: $password) {
      userName
      token
    }
  }
`;

export const registerGraphql = async (
	client: ApolloClient<object>,
	user: User
  ) => {
	const { data } = await client.mutate({
	  mutation: REGISTER,
	  variables: user,
	});
	return data.register;
  };