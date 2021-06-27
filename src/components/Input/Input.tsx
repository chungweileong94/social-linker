import React from 'react';
import {TextField, TextFieldProps} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

type Props = TextFieldProps;

const Input: React.FC<Props> = ({className, ...props}) => {
  const styles = useStyles();

  return <TextField {...props} className={clsx(styles.container, className)} />;
};

const useStyles = makeStyles(({spacing}) => ({
  container: {
    marginBottom: spacing(2),
  },
  root: {
    borderRadius: 50,
  },
}));

export default Input;
