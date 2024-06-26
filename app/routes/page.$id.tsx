import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SocialLink } from "~/components/SocialLink";
import { decryptBioData } from "~/models/Bio.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const pageId = params.id;
  if (!pageId) {
    throw new Response(undefined, { status: 404 });
  }

  try {
    const bioData = decryptBioData(pageId);
    return json(bioData);
  } catch {
    throw new Response(undefined, {
      status: 500,
      statusText: "Sorry, we not able to retrieve the bio 😥",
    });
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    throw new Error("Failed to get bio data");
  }
  const { title, desc } = data;
  return [{ title, description: desc }];
};

const BioPage = () => {
  const bio = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="pointer-events-none fixed left-0 top-0 bottom-0 right-0 opacity-40">
        <div className="relative top-1/2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute top-0 left-0 aspect-square h-4/6 animate-blob rounded-full bg-primary opacity-70 mix-blend-overlay blur-xl filter" />
          <div className="animation-delay-2000 absolute top-0 right-0 aspect-square h-5/6 animate-blob rounded-full bg-secondary opacity-70 mix-blend-overlay blur-xl filter" />
          <div className="animation-delay-4000 absolute bottom-0 left-1/4 aspect-square h-full animate-blob rounded-full bg-accent opacity-70 mix-blend-overlay blur-xl filter" />
        </div>
      </div>
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
    </div>
  );
};

export default BioPage;
