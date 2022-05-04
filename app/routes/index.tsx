import {ActionFunction, MetaFunction, redirect} from '@remix-run/node';
import {Form, useActionData} from '@remix-run/react';
import Typist from 'react-text-typist';
import {z} from 'zod';

import {Button} from '~/components/Button';
import {Input} from '~/components/Input';
import {TextArea} from '~/components/TextArea';

type FormErrors = {
  title?: string[];
};

export const meta: MetaFunction = () => {
  return {
    title: 'Generate Social Bio | Social Linker',
    description: 'Generate your own social bio',
  };
};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());

  const validateResult = z
    .object({title: z.string().min(1, 'Title is required')})
    .safeParse(values);
  if (!validateResult.success) {
    return validateResult.error.formErrors.fieldErrors as FormErrors;
  }

  return redirect(``);
};

const Index = () => {
  const errors = useActionData<FormErrors>();
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

      <Form
        method="post"
        className="grid w-full gap-4 md:w-3/4 lg:w-2/3 xl:w-1/2"
      >
        <Input
          name="title"
          label="Title"
          required
          className="w-full"
          error={!!errors?.title}
          helperText={errors?.title?.[0]}
        />

        <TextArea name="description" label="Description" className="mb-10" />

        <Button type="submit">Create My Social Bio</Button>
      </Form>
    </div>
  );
};

export default Index;
