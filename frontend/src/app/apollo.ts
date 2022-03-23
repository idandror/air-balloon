import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5005/graphql',
});

const authLink = setContext((_, { headers }) => {
	let user;
	if (sessionStorage.getItem('user')) {
		user = JSON.parse(sessionStorage.getItem('user') || '');
	  }
  const token = user?.token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
