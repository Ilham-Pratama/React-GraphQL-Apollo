import React from 'react';
import { Query } from 'react-apollo';
import Loading from '../../Components/Loading';
import { GET_REPOSITORY_OF_ORGANIZATION } from '../../Configs/organizationConfig';
import Error from '../../Components/Error';
import RepositoryList from '../../Components/Repository/RepositoryList';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  // If there's no new result
  if (!fetchMoreResult) {
    return previousResult;
  }
  const mergedRes = {
    ...previousResult,
    organization: {
      ...previousResult.organization,
      repositories: {
        ...fetchMoreResult.organization.repositories,
        edges: [
          ...previousResult.organization.repositories.edges,
          ...fetchMoreResult.organization.repositories.edges
        ]
      }
    }
  };
  return mergedRes;
};

const Organization = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Query
        query={GET_REPOSITORY_OF_ORGANIZATION}
        variables={{ organizationName: 'airbnb' }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, loading, error, fetchMore }) => {
          if (error) {
            return <Error message={error} />;
          }
          if (loading && !data) {
            return <Loading />;
          }
          return (
            <React.Fragment>
              <h1>From {data.organization.name}</h1>
              <RepositoryList
                repositories={data.organization.repositories}
                fetchMore={fetchMore}
                updateQuery={updateQuery}
                loading={loading}
              />
            </React.Fragment>
          );
        }}
      </Query>
    </div>
  );
};

export default Organization;
