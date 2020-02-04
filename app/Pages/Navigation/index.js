import React from 'react';
import { Link } from 'react-router-dom';
import * as constants from '../../constants';

const Navigation = () => {
  return (
    <div style={{ textAlign: 'center', marginBottom: 20 }}>
      <Link to={constants.ORGANIZATION}>Organization</Link>{' '}
      <Link to={constants.PROFILE}>Profile</Link>
    </div>
  );
};

export default Navigation;
