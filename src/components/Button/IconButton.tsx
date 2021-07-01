import React from 'react';
import {IconButton as MUIIconButton, IconButtonProps} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type Props = IconButtonProps;

const IconButton: React.FC<Props> = props => {
  const styles = useStyles();
  return (
    <MUIIconButton {...props} disableRipple classes={{root: styles.root}} />
  );
};

const useStyles = makeStyles(() => ({
  root: {
    '&:active': {
      opacity: 0.7,
    },
  },
}));

export default IconButton;
