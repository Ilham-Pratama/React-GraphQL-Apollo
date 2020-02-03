import React from 'react';
import { GET_CURRENT_USER_REPO } from '../../config';
import { Query } from 'react-apollo';
import Loading from '../../Components/Loading';
import RepositoryList from '../../Components/Repository/RepositoryList';
import Error from '../../Components/Error';

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
            loading={loading}
          />
          <hr />
          <h1>From {viewer.login}</h1>
          <RepositoryList
            repositories={viewer.repositories}
            fetchMore={fetchMore}
          />
        </React.Fragment>
      );
    }}
  </Query>
);

export default Profile;
