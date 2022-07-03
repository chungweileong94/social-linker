// eslint-disable-next-line @typescript-eslint/no-redeclare
import {json, LoaderFunction, MetaFunction, Response} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';

import SocialLink from '~/components/SocialLink';
import {Bio, decryptBioData} from '~/models/Bio.server';

type LoaderData = Bio;

export const meta: MetaFunction = ({data}) => {
  const {title, desc} = data as LoaderData;
  return {title, description: desc};
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
    <div className="container mx-auto flex flex-col items-center py-20">
      <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
        {bio.title}
      </h1>
      {!!bio.desc && (
        <p className="mb-20 text-center text-sm sm:text-base">{bio.desc}</p>
      )}

      <div className="flex w-full flex-col gap-3">
        {bio.links.map((link) => (
          <SocialLink key={link.value} url={link.value} />
        ))}
      </div>
    </div>
  );
};

export default BioPage;
