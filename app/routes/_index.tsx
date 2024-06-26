import {
  type ActionFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { useState } from "react";
import { ValidatedForm, validationError } from "remix-validated-form";
import Typewriter from "typewriter-effect";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Button } from "~/components/Button";
import { FormInputController } from "~/components/FormController";
import { AddIcon, CheckIcon, CloseIcon } from "~/components/Icon";
import { Input, LinkPreviewInput } from "~/components/Input";
import { TextArea } from "~/components/TextArea";
import { Tooltip } from "~/components/Tooltip";
import { encryptBioData } from "~/models/Bio.server";

type SuccessActionData = {
  success: true;
  data: string;
};

const isSuccessActionData = (
  response: Record<string, unknown> | undefined,
): response is SuccessActionData => !!response?.["success"];

const formValidator = withZod(
  zfd.formData({
    title: z.string().min(1, "Title is required"),
    desc: z.string().optional(),
    links: z.array(
      z.object({
        value: z.string().url("Invalid URL"),
      }),
    ),
  }),
);

export const meta: MetaFunction = () => {
  return [
    {
      title: "Generate Social Bio | Social Linker",
      description: "Generate your own social bio",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = await formValidator.validate(formData);
  if (data.error) return validationError(data.error);

  const encryptedBioString = encryptBioData(data.data);
  return json<SuccessActionData>({
    success: true,
    data: `${request.headers.get("origin")}/page/${encryptedBioString}`,
  });
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  const socialURL = isSuccessActionData(actionData)
    ? actionData.data
    : undefined;
  const { state } = useNavigation();
  const loading = state !== "idle";
  const [linkIds, setLinkIds] = useState<string[]>([uuidv4()]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [prevSocialURL, setPrevSocialURL] = useState<string>();
  if (prevSocialURL !== socialURL) {
    setPrevSocialURL(socialURL);
    setIsCopied(false);
  }

  function handleAddLink() {
    setLinkIds((prev) => [...prev, uuidv4()]);
  }

  function handleRemoveLink(id: string) {
    setLinkIds((prev) => prev.filter((linkId) => linkId !== id));
  }

  async function handleCopySocialBioLink() {
    if (!socialURL) return;
    await navigator.clipboard.writeText(socialURL);
    setIsCopied(true);
  }

  return (
    <div className="container mx-auto flex flex-col items-center py-20">
      <h1 className="min-h-[4rem] text-center text-2xl sm:text-3xl">
        Welcome to{" "}
        <span className="text-accent">
          <Typewriter
            component="span"
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1000)
                .typeString("SocialLinker")
                .pauseFor(3000)
                .deleteAll()
                .typeString("your Social Bio")
                .start();
            }}
          />
        </span>
      </h1>
      <p className="mb-20 text-sm opacity-50 sm:text-base">
        Create your own social bio now!
      </p>
      <ValidatedForm
        validator={formValidator}
        method="post"
        className="grid w-full gap-4"
      >
        {!loading && !!socialURL && (
          <div
            id="result"
            className="dui-alert sticky top-4 mb-4 flex flex-row shadow-lg"
          >
            <div className="flex flex-1 flex-row items-center gap-2">
              <CheckIcon className="h-6 w-6 flex-shrink-0 text-success" />
              <span>Your social bio page is ready!</span>
            </div>
            <div className="flex flex-row gap-2">
              <Tooltip text={isCopied ? "Copied" : "Copy Link"}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopySocialBioLink}
                >
                  Copy
                </Button>
              </Tooltip>
              <a
                href={socialURL}
                target="__blank"
                className="dui-btn-info dui-btn-sm dui-btn"
              >
                View
              </a>
            </div>
          </div>
        )}

        <FormInputController
          name="title"
          render={(props) => (
            <Input {...props} required label="Title" className="w-full" />
          )}
        />

        <FormInputController
          name="desc"
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
                  disabled={loading}
                  onClick={() => handleRemoveLink(id)}
                >
                  <CloseIcon />
                </Button>
              )}
            </div>
          ))}
          {linkIds.length < 10 && (
            <Button
              variant="outline"
              className="w-full"
              disabled={loading}
              onClick={handleAddLink}
            >
              <AddIcon />
              Add Link
            </Button>
          )}
        </div>

        <Button type="submit" color="accent" loading={loading}>
          Create My Social Bio
        </Button>
      </ValidatedForm>
    </div>
  );
}
