// eslint-disable-next-line @typescript-eslint/no-redeclare
import {json, LoaderFunction, MetaFunction, Response} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';

import {Bio, decryptBioData} from '~/models/Bio.server';

type LoaderData = Bio;

export const meta: MetaFunction = ({data}) => {
  const {title, description} = data as LoaderData;
  return {title, description};
};

export const loader: LoaderFunction = async ({params}) => {
  const pageId = params.id;
  if (!pageId) {
    throw new Response(undefined, {status: 404});
  }

  try {
    const bioData = decryptBioData(pageId);
    return json<LoaderData>(bioData);
  } catch (error) {
    throw new Response(undefined, {
      status: 500,
      statusText: 'Sorry, we not able to retrieve the bio 😥',
    });
  }
};

const BioPage = () => {
  const bio = useLoaderData<LoaderData>();
  return (
    // TODO: UI
    <div className="p-6">
      <div className="dui-mockup-code">
        <pre>
          <code>{JSON.stringify(bio, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default BioPage;
