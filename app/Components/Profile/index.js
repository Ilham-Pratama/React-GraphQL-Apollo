import React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER_REPO } from '../../config';
import Loading from '../Loading';
import RepositoryList from '../Repository/RepositoryList';
import Error from '../Error';

const Profile = () => {
  return (
    <Query query={GET_CURRENT_USER_REPO}>
      {({ data, loading, error }) => {
        if (error) {
          return <Error message={error} />;
        }
        if (loading | !data) {
          return <Loading />;
        }
        const { viewer } = data;
        return <RepositoryList repositories={viewer.repositories} />;
      }}
    </Query>
  );
};

export default Profile;
