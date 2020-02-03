import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
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

// Fragments

export const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    url
    description
    primaryLanguage {
      name
    }
    owner {
      login
      url
    }
    stargazers {
      totalCount
    }
    viewerHasStarred
    watchers {
      totalCount
    }
    viewerSubscription
  }
`;

export const PAGEINFO_FRAGMENT = gql`
  fragment info on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
  }
`;

export const REPOINFO = gql`
  fragment repositoryConnection on RepositoryConnection {
    edges {
      node {
        ...repository
      }
    }
    pageInfo {
      ...info
    }
  }
  ${REPOSITORY_FRAGMENT}
  ${PAGEINFO_FRAGMENT}
`;

// Queries

export const WATCH_REPOSITORY = gql`
  mutation($id: ID!, $viewerSubscription: SubscriptionState!) {
    updateSubscription(
      input: { state: $viewerSubscription, subscribableId: $id }
    ) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;

export const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const GET_CURRENT_USER_REPO = gql`
  query($cursor: String) {
    user(login: "rwieruch") {
      name
      repositories(first: 5, after: $cursor) {
        ...repositoryConnection
      }
    }
    viewer {
      login
      id
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        ...repositoryConnection
      }
    }
  }
  ${REPOINFO}
`;
