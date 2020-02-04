import gql from 'graphql-tag';
import { REPOINFO } from './profileConfig';

export const GET_REPOSITORY_OF_ORGANIZATION = gql`
  query($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      name
      repositories(first: 5, after: $cursor) {
        ...repositoryConnection
      }
    }
  }

  ${REPOINFO}
`;
