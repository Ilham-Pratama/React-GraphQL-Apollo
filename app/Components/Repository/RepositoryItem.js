import React from 'react';
import { Mutation } from 'react-apollo';
import { STAR_REPOSITORY } from '../../config';
import Button from '../Button';
import Loading from '../Loading';
import Error from '../Error';

const RepositoryItem = ({
  name,
  id,
  url,
  description,
  primaryLanguage,
  owner,
  stargazers,
  viewerSubscription,
  viewerHasStarred
}) => {
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
          {!viewerHasStarred ? (
            <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
              {(addStar, { data, loading, error }) => {
                if (loading) {
                  return <Loading />;
                }
                if (error) {
                  return <Error message={error} />;
                }
                return (
                  <Button onClick={addStar}>
                    {stargazers.totalCount} Stars
                  </Button>
                );
              }}
            </Mutation>
          ) : (
            ''
          )}
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
