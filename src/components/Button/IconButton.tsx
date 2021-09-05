import React from 'react';
import {IconButton as MUIIconButton, IconButtonProps} from '@material-ui/core';

type Props = IconButtonProps;

const IconButton: React.FC<Props> = (props) => {
  return <MUIIconButton {...props} />;
};

export default IconButton;
