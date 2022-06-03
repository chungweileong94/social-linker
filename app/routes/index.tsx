import {ActionFunction, MetaFunction, redirect} from '@remix-run/node';
import {useState} from 'react';
import Typist from 'react-text-typist';
import {z} from 'zod';
import {zfd} from 'zod-form-data';
import {v4 as uuidv4} from 'uuid';
import {ValidatedForm, validationError} from 'remix-validated-form';
import {withZod} from '@remix-validated-form/with-zod';

import {Button} from '~/components/Button';
import {Input, LinkPreviewInput} from '~/components/Input';
import {TextArea} from '~/components/TextArea';
import {createBio} from '~/models/Bio.server';
import {FormInputController} from '~/components/FormController';
import {AddIcon, CloseIcon} from '~/components/Icon';

const formValidator = withZod(
  zfd.formData({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    links: z.array(
      z.object({
        value: z.string().url('Invalid URL'),
      }),
    ),
  }),
);

export const meta: MetaFunction = () => {
  return {
    title: 'Generate Social Bio | Social Linker',
    description: 'Generate your own social bio',
  };
};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const data = await formValidator.validate(formData);
  if (data.error) return validationError(data.error);

  const bio = createBio(data.data);

  // TODO: Implement
  console.log(bio);

  return redirect(``);
};

const Index = () => {
  const [linkIds, setLinkIds] = useState<string[]>([uuidv4()]);

  const handleAddLink = () => {
    setLinkIds((prev) => [...prev, uuidv4()]);
  };

  const handleRemoveLink = (id: string) => {
    setLinkIds((prev) => prev.filter((linkId) => linkId !== id));
  };

  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-20">
      <h1 className="min-h-[4rem] text-center text-2xl sm:text-3xl ">
        Welcome to{' '}
        <Typist
          sentences={['SocialLinker', 'your Social Bio']}
          startDelay={1000}
          pauseTime={3000}
          loop={false}
          className="text-accent"
        />
      </h1>
      <p className="mb-20 text-sm opacity-50 sm:text-base">
        Create your own social bio now!
      </p>

      <ValidatedForm
        validator={formValidator}
        method="post"
        className="grid w-full gap-4 md:w-3/4 lg:w-2/3 xl:w-1/2"
      >
        <FormInputController
          name="title"
          render={(props) => (
            <Input {...props} required label="Title" className="w-full" />
          )}
        />

        <FormInputController
          name="description"
          render={(props) => (
            <TextArea {...props} label="Description" className="mb-10" />
          )}
        />

        <div className="mb-10">
          <span className="mb-4 block text-base sm:text-lg">
            Social Media Links
          </span>

          {linkIds.map((id, index) => (
            <div key={id} className="mb-4 flex flex-row items-center gap-3">
              <FormInputController
                name={`links[${index}].value`}
                render={(props) => (
                  <LinkPreviewInput
                    {...props}
                    required
                    className="w-full"
                    placeholder="Enter URL"
                  />
                )}
              />
              {linkIds.length > 1 && (
                <Button
                  size="sm"
                  shape="square"
                  color="error"
                  onClick={() => handleRemoveLink(id)}
                >
                  <CloseIcon />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={handleAddLink}>
            <AddIcon />
            Add Link
          </Button>
        </div>

        <Button type="submit" color="accent">
          Create My Social Bio
        </Button>
      </ValidatedForm>
    </div>
  );
};

export default Index;
