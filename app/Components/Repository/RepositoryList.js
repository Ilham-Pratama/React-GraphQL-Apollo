import React from 'react';
import RepositoryItem from './RepositoryItem';
import { useStyles } from '../../styles';
import FetchMore from '../FetchMore';

const RepositoryList = ({ repositories, fetchMore, loading, updateQuery }) => {
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
