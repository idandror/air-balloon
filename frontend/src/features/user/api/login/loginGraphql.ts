import { ApolloClient, gql } from '@apollo/client';
import { User } from '../../interface/userInterfaces';

export const LOGIN = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      userName
      token
    }
  }
`;

export const loginGraphql = async (
  client: ApolloClient<object>,
  user: User
) => {
  const { data } = await client.mutate({
    mutation: LOGIN,
    variables: user,
  });
  return data.login;
};
