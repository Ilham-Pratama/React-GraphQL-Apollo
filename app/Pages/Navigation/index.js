import React from 'react';
import { Link } from 'react-router-dom';
import * as constants from '../../constants';

const Navigation = () => {
  return (
    <div style={{ textAlign: 'right' }}>
      <Link to={constants.ORGANIZATION}>Organization</Link>
      {'  '}
      <Link to={constants.PROFILE}>Profile</Link>
    </div>
  );
};

export default Navigation;
