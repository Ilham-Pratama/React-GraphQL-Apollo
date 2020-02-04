import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const GITHUB_ENDPOINT = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_ENDPOINT,
  headers: {
    authorization: `bearer ${process.env.REACT_APP_GITHUB_KEY}`
  }
});

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('From Config File');
    console.log(graphQLErrors);
  }
  if (networkError) {
    console.log('From Config File');
    console.log(networkError);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache
});
