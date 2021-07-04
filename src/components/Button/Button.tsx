import React from 'react';
import {Button as MUIButton, ButtonProps} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

type Props = ButtonProps;

const Button: React.FC<Props> = ({classes, ...props}) => {
  const styles = useStyles();
  return (
    <MUIButton
      variant="contained"
      color="primary"
      disableElevation
      classes={{
        ...classes,
        text: clsx(styles.contained, classes?.contained),
        contained: clsx(styles.contained, classes?.contained),
        outlined: clsx(styles.contained, classes?.contained),
        label: clsx(styles.label, classes?.label),
      }}
      {...props}
    />
  );
};

const useStyles = makeStyles(({spacing}) => ({
  contained: {
    borderRadius: 10,
    paddingTop: spacing(1.5),
    paddingBottom: spacing(1.5),
  },
  label: {
    textTransform: 'none',
    fontWeight: 'bold',
  },
}));

export default Button;
