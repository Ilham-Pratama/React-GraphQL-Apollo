import React from 'react';

const Error = ({ message }) => {
  return (
    <div>
      <small>{message.toString()}</small>
    </div>
  );
};

export default Error;
