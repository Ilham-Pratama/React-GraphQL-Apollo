import React from 'react';
import { GET_CURRENT_USER_REPO } from '../../config';
import { graphql } from 'react-apollo';
import Loading from '../Loading';
import RepositoryList from '../Repository/RepositoryList';
import Error from '../Error';

const Profile = ({ data: { loading, viewer, error, ...data } }) => {
  if (error) {
    return <Error message={error} />;
  }
  if (loading | !data) {
    return <Loading />;
  }
  return <RepositoryList repositories={viewer.repositories} />;
};

export default graphql(GET_CURRENT_USER_REPO)(Profile);
