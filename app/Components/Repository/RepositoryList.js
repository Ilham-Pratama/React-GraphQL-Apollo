import React from 'react';
import RepositoryItem from './RepositoryItem';
import { useStyles } from '../../styles';
import FetchMore from '../FetchMore';

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

const RepositoryList = ({ repositories, fetchMore, loading }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {repositories.edges.map(({ node }) => (
        <div key={node.id}>
          <RepositoryItem {...node} />
        </div>
      ))}
      <FetchMore
        hasNextPage={repositories.pageInfo.hasNextPage}
        loading={loading}
        fetchMore={fetchMore}
        updateQuery={updateQuery}
        variables={{ cursor: repositories.pageInfo.endCursor }}
        className={classes.addMargin}
        variant="outlined"
      >
        Fetch More
      </FetchMore>
    </React.Fragment>
  );
};

export default RepositoryList;
