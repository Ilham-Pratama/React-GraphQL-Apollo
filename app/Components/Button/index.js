import React from 'react';
import { Button } from '@material-ui/core';

const ButtonBase = ({ children, style = {}, ...props }) => (
  <Button
    variant="contained"
    color="primary"
    {...props}
    style={{
      ...style,
      fontFamily: style.fontFamily ? style.fontFamily : 'Raleway-regular'
    }}
  >
    {children}
  </Button>
);

export default ButtonBase;
