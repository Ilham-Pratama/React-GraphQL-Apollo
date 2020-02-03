import React from 'react';
import Loading from '../Loading';
import Button from '../Button';

const FetchMore = ({
  hasNextPage,
  fetchMore,
  variables,
  loading,
  updateQuery,
  children,
  ...props
}) =>
  hasNextPage &&
  (!loading ? (
    <Button
      onClick={() =>
        fetchMore({
          variables,
          updateQuery
        })
      }
      {...props}
    >
      {children}
    </Button>
  ) : (
    <Loading />
  ));

export default FetchMore;
