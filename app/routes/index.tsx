import {ActionFunction, json, MetaFunction, redirect} from '@remix-run/node';
import {Form, useActionData} from '@remix-run/react';
import Typist from 'react-text-typist';
import {z} from 'zod';
import {zfd} from 'zod-form-data';

import {Button} from '~/components/Button';
import {Input} from '~/components/Input';
import {TextArea} from '~/components/TextArea';
import {createBio} from '~/models/Bio.server';
import {ExtractFormErrors, useFormErrors, validateForm} from '~/utils/form';

const FORM_SCHEMA = zfd.formData({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

type FormErrors = ExtractFormErrors<typeof FORM_SCHEMA>;

type ActionData = {
  errors: FormErrors;
};

export const meta: MetaFunction = () => {
  return {
    title: 'Generate Social Bio | Social Linker',
    description: 'Generate your own social bio',
  };
};

export const action: ActionFunction = async ({request}) => {
  try {
    const formData = await request.formData();
    const bioValues = validateForm(formData, FORM_SCHEMA);
    const bio = createBio(bioValues);
    return redirect(``);
  } catch (errors) {
    return json<ActionData>({errors: errors as FormErrors});
  }
};

const Index = () => {
  const actionData = useActionData<ActionData>();
  const {getInputErrorProps} = useFormErrors(actionData?.errors);
  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-20">
      <h1 className="min-h-[4rem] text-center text-2xl sm:text-3xl ">
        Welcome to{' '}
        <Typist
          sentences={['SocialLinker', 'your Social Bio']}
          startDelay={1000}
          pauseTime={3000}
          loop={false}
          className="text-primary"
        />
      </h1>
      <p className="mb-20 text-sm opacity-50 sm:text-base">
        Create your own social bio now!
      </p>

      <Form
        method="post"
        className="grid w-full gap-4 md:w-3/4 lg:w-2/3 xl:w-1/2"
      >
        <Input
          name="title"
          required
          label="Title"
          className="w-full"
          {...getInputErrorProps('title')}
        />

        <TextArea
          name="description"
          label="Description"
          className="mb-10"
          {...getInputErrorProps('description')}
        />

        <Button type="submit">Create My Social Bio</Button>
      </Form>
    </div>
  );
};

export default Index;
