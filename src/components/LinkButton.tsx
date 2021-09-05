import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import {SocialIcon, keyFor} from 'react-social-icons';

import {Button} from './Button';

type Props = {
  url: string;
};

const DEFAULT_LABEL = 'link';

const LinkButton: React.FC<Props> = ({url}) => {
  const styles = useStyles();

  let label = keyFor(url).replace('sharethis', DEFAULT_LABEL);
  label =
    label === DEFAULT_LABEL ? url : label?.[0].toUpperCase() + label.slice(1);

  return (
    <Button
      variant="text"
      startIcon={
        <SocialIcon url={url} tabIndex={-1} className={styles.socialIcon} />
      }
      className={styles.container}
      onClick={() => window.open(url, '_blank')}
    >
      <Typography variant="h6" component="span" className={styles.label}>
        {label}
      </Typography>
    </Button>
  );
};

const useStyles = makeStyles(({spacing}) => ({
  container: {
    padding: spacing(2, 2),
  },
  socialIcon: {
    pointerEvents: 'none',

    // `react-social-icons` is using inline-styling
    width: `${spacing(5)}px !important`,
    height: `${spacing(5)}px !important`,
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '90%',
    marginLeft: spacing(3),
  },
}));

export default LinkButton;
