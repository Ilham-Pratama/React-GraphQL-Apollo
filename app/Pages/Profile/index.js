import React from 'react';
import { GET_CURRENT_USER_REPO } from '../../Configs/profileConfig';
import { Query } from 'react-apollo';
import Loading from '../../Components/Loading';
import RepositoryList from '../../Components/Repository/RepositoryList';
import Error from '../../Components/Error';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  // If there's no new result
  if (!fetchMoreResult) {
    return previousResult;
  }
  const mergedRes = {
    ...previousResult,
    user: {
      ...previousResult.user,
      repositories: {
        ...fetchMoreResult.user.repositories,
        edges: [
          ...previousResult.user.repositories.edges,
          ...fetchMoreResult.user.repositories.edges
        ]
      }
    }
  };
  return mergedRes;
};

const Profile = () => (
  <Query query={GET_CURRENT_USER_REPO} notifyOnNetworkStatusChange={true}>
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <Error message={error} />;
      }
      if (loading && !data) {
        return <Loading />;
      }
      const { viewer } = data;
      return (
        <React.Fragment>
          <h1>From {data.user.name}</h1>
          <RepositoryList
            repositories={data.user.repositories}
            fetchMore={fetchMore}
            updateQuery={updateQuery}
            loading={loading}
          />
          <hr />
          <h1>From {viewer.login}</h1>
          <RepositoryList
            repositories={viewer.repositories}
            fetchMore={fetchMore}
            updateQuery={updateQuery}
          />
        </React.Fragment>
      );
    }}
  </Query>
);

export default Profile;
