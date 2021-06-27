import React from 'react';
import Head from 'next/head';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Typist from 'react-text-typist';

import {Input} from '~/components/Input';

const Home: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <Head>
        <title>Generate Social Bio | Social Linker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Typography variant="h4" className={styles.title}>
          Welcome to{' '}
          <Typist
            sentences={['SocialLinker', 'your Social Bio']}
            startDelay={1000}
            pauseTime={3000}
            loop={false}
            className={styles.appName}
          />
        </Typography>

        <Typography className={styles.desc}>- Create your own social bio now! -</Typography>

        <form className={styles.form}>
          <Input name="title" label="Title" variant="outlined" />
          <Input name="desc" label="Description" variant="outlined" multiline rows={4} />
        </form>
      </div>
    </>
  );
};

const useStyles = makeStyles(({spacing, palette, breakpoints}) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing(2),
  },
  appName: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: palette.primary.main,
  },
  desc: {
    textAlign: 'center',
    marginBottom: spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',

    [breakpoints.down('md')]: {
      width: '50%',
    },

    [breakpoints.down('sm')]: {
      width: '70%',
    },

    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

export default Home;
