import gql from 'graphql-tag';

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
    startCursor
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
