import {MetaFunction} from '@remix-run/node';
import {Form} from '@remix-run/react';
import Typist from 'react-text-typist';

import {Input} from '~/components/Input';
import {TextArea} from '~/components/TextArea';

export const meta: MetaFunction = () => {
  return {
    title: 'Generate Social Bio | Social Linker',
    description: 'Generate your own social bio',
  };
};

const Index = () => {
  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-20">
      <h1 className="mb-5 text-3xl">
        Welcome to{' '}
        <Typist
          sentences={['SocialLinker', 'your Social Bio']}
          startDelay={1000}
          pauseTime={3000}
          loop={false}
          className="text-primary"
        />
      </h1>
      <p className="mb-20 opacity-50">Create your own social bio now!</p>

      <Form className="grid w-full gap-4 md:w-3/4">
        <Input name="title" label="Title" className="w-full" />

        <TextArea name="description" label="Description" />
      </Form>
    </div>
  );
};

export default Index;
