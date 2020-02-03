import React from 'react';
import { Mutation } from 'react-apollo';
import {
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY,
  REPOSITORY_FRAGMENT,
  WATCH_REPOSITORY
} from '../../config';
import Button from '../Button';
import Loading from '../Loading';
import Error from '../Error';
import { useStyles } from '../../styles';

const VIEWER_SUBSCRIPTION = {
  SUBSCRIBED: 'SUBSCRIBED',
  UNSUBSCRIBED: 'UNSUBSCRIBED'
};

const isWatch = viewerSubscription =>
  viewerSubscription === VIEWER_SUBSCRIPTION.SUBSCRIBED;

const updateWatch = (client, mutationResult) => {
  const {
    id,
    viewerSubscription
  } = mutationResult.data.updateSubscription.subscribable;
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT
  });
  let { totalCount } = repository.watchers;
  totalCount =
    viewerSubscription === VIEWER_SUBSCRIPTION.SUBSCRIBED
      ? totalCount + 1
      : totalCount - 1;
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount
      }
    }
  });
};

const updateStar = type => (client, mutationResult) => {
  const { id } = mutationResult.data[type].starrable;
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT
  });
  const totalCount =
    type === 'addStar'
      ? repository.stargazers.totalCount + 1
      : repository.stargazers.totalCount - 1;
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount
      }
    }
  });
};
const RepositoryItem = ({
  name,
  id,
  url,
  description,
  primaryLanguage,
  owner,
  stargazers,
  viewerSubscription,
  viewerHasStarred,
  watchers
}) => {
  const classes = useStyles();
  return (
    <div>
      <div className="RepositoryItem-title">
        <h2>
          <a href={url}>{name}</a>
        </h2>
        <div>
          {owner && (
            <span>
              Owner: <a href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
        <div>
          <Mutation
            mutation={WATCH_REPOSITORY}
            variables={{
              id,
              viewerSubscription: !isWatch(viewerSubscription)
                ? VIEWER_SUBSCRIPTION.SUBSCRIBED
                : VIEWER_SUBSCRIPTION.UNSUBSCRIBED
            }}
            update={updateWatch}
            optimisticResponse={{
              updateSubscription: {
                __typename: 'FakeMutation',
                subscribable: {
                  __typename: 'FakeRepository',
                  id,
                  viewerSubscription: isWatch(viewerSubscription)
                    ? VIEWER_SUBSCRIPTION.UNSUBSCRIBED
                    : VIEWER_SUBSCRIPTION.SUBSCRIBED
                }
              }
            }}
          >
            {(updateSubscription, { data, loading, error }) => {
              if (loading) {
                return <Loading />;
              }
              return (
                <Button
                  className={classes.addMargin}
                  className="btn"
                  onClick={updateSubscription}
                >
                  {watchers.totalCount}{' '}
                  {isWatch(viewerSubscription) ? 'Unwatch' : 'Watch'}
                </Button>
              );
            }}
          </Mutation>
          <Mutation
            mutation={viewerHasStarred ? UNSTAR_REPOSITORY : STAR_REPOSITORY}
            variables={{ id }}
            update={updateStar(viewerHasStarred ? 'removeStar' : 'addStar')}
          >
            {(addStar, { data, loading, error }) => {
              if (loading) {
                return <Loading />;
              }
              if (error) {
                return <Error message={error} />;
              }
              return (
                <Button
                  className={classes.addMargin}
                  onClick={addStar}
                  title={
                    viewerHasStarred ? 'UNSTAR_REPOSITORY' : 'STAR_REPOSITORY'
                  }
                >
                  {stargazers.totalCount} {viewerHasStarred ? 'Unstar' : 'Star'}
                </Button>
              );
            }}
          </Mutation>
        </div>
      </div>
      <div className="RepositoryItem-description">
        <div>
          <span>
            <strong>Description : </strong>
            <br />
            {description}
          </span>
        </div>
        <div className="RepositoryItem-description-details">
          <div>
            {primaryLanguage && (
              <span>
                <strong>Language</strong>: {primaryLanguage.name}
              </span>
            )}
          </div>
          <div>
            <strong>Subscription</strong> : {viewerSubscription}
          </div>
          <div>
            <strong>User has starred</strong> : {viewerHasStarred.toString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryItem;
