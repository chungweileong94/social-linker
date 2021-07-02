import React, {useMemo} from 'react';
import Head from 'next/head';
import {Typography, Divider, InputAdornment} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import AddIcon from '@material-ui/icons/Add';
import Typist from 'react-text-typist';
import {SocialIcon} from 'react-social-icons';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import {NextPage} from 'next';

import {Input} from '~/components/Input';
import {Button, IconButton} from '~/components/Button';
import {customRHFInputProps} from '~/utlis';
import {SocialPage} from '~/typings';

import type {GenerateTokenAPIResponse} from './api/generateToken';

type FormValues = SocialPage;

const defaultFormValues: FormValues = {
  title: '',
  desc: '',
  links: [{value: ''}],
};

const Home: NextPage = () => {
  const styles = useStyles();
  const form = useForm<FormValues>({defaultValues: defaultFormValues});
  const {control, handleSubmit} = form;
  const {
    fields,
    append: addLink,
    remove: removeLink,
  } = useFieldArray({control, name: 'links'});
  const insertedLinks = useWatch({control, name: 'links', defaultValue: []});

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      const result = await fetch('/api/generateToken', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const payload = (await result.json()) as GenerateTokenAPIResponse;

      if (!payload.success) {
        throw new Error(payload.error.message);
      }

      console.log(`${window.location.origin}/page/${payload.data.token}`);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.message);
    }
  };

  // `useMemo` is to prevent `Typist` from re-render/re-animate again
  const typistTitle = useMemo(
    () => (
      <Typist
        sentences={['SocialLinker', 'your Social Bio']}
        startDelay={1000}
        pauseTime={3000}
        loop={false}
        className={styles.appName}
      />
    ),
    [styles.appName],
  );

  return (
    <>
      <Head>
        <title>Generate Social Bio | Social Linker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Typography variant="h4" className={styles.title} component="span">
          Welcome to {typistTitle}
        </Typography>

        <Typography className={styles.desc} component="span">
          - Create your own social bio now! -
        </Typography>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="title"
            rules={{required: 'Title is required'}}
            render={({field}) => (
              <Input
                {...customRHFInputProps(form, field)}
                label="Title"
                variant="outlined"
              />
            )}
          />
          <Controller
            control={control}
            name="desc"
            render={({field}) => (
              <Input
                {...customRHFInputProps(form, field)}
                label="Description"
                variant="outlined"
                multiline
                rows={4}
              />
            )}
          />

          <div className={styles.linkInputsContainer}>
            <Typography
              variant="h6"
              className={styles.subTitle}
              component="span"
            >
              Social Media Links
            </Typography>
            {fields.map((field, index) => {
              return (
                <Controller
                  key={field.id}
                  control={control}
                  name={`links.${index}.value`}
                  rules={{required: 'Please enter a link'}}
                  defaultValue=""
                  render={({field: fieldProps}) => (
                    <div className={styles.linkInputWrapper}>
                      <Input
                        {...customRHFInputProps(form, fieldProps)}
                        type="url"
                        variant="outlined"
                        placeholder="Enter URL"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SocialIcon
                                url={fieldProps.value}
                                bgColor="#00000030"
                                className={styles.socialIcon}
                                tabIndex={-1}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {insertedLinks.length > 1 && (
                        <IconButton
                          aria-label="delete"
                          className={styles.deleteButton}
                          onClick={() => removeLink(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                  )}
                />
              );
            })}

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => addLink({value: ''})}
            >
              Add Link
            </Button>
          </div>

          <Divider className={styles.divider} />

          <Button type="submit">Create My Social Bio</Button>
        </form>
      </div>
    </>
  );
};

const useStyles = makeStyles(({spacing, palette, breakpoints}) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing(12, 2),
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
  divider: {
    alignSelf: 'center',
    width: '60%',
    margin: spacing(4, 0),
  },
  linkInputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: spacing(4),

    '& .MuiTextField-root': {
      width: '100%',
    },
  },
  subTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: spacing(2),
  },
  linkInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing(2),
  },
  socialIcon: {
    pointerEvents: 'none',

    // `react-social-icons` is using inline-styling
    width: `${spacing(4)}px !important`,
    height: `${spacing(4)}px !important`,
  },
  deleteButton: {
    marginTop: spacing(0.5),
    marginLeft: spacing(1),
    color: palette.error.main,
  },
}));

export default Home;
