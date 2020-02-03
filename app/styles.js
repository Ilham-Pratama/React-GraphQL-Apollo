import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme =>
  createStyles({
    addMargin: {
      margin: theme.spacing(2)
    }
  })
);
