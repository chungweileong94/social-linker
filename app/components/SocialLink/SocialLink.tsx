import type React from "react";
import { SocialIcon, keyFor } from "react-social-icons";

type Props = {
  url: string;
};

const SocialLink: React.FC<Props> = ({ url }) => {
  const key = keyFor(url);
  const label =
    key === "sharethis" ? url : key?.[0]?.toUpperCase() + key.slice(1);

  return (
    <a
      role="button"
      href={url}
      target="_blank"
      className="rounded-lg border-2 border-transparent transition-all hover:scale-105 hover:border-accent active:scale-95"
      rel="noreferrer"
    >
      <span className="flex w-full flex-row items-center justify-start gap-3 p-4">
        <SocialIcon
          url={url}
          bgColor="#7e7e7e"
          style={{ width: "2rem", height: "2rem" }}
        />
        <span className="truncate normal-case">{label}</span>
      </span>
    </a>
  );
};

export default SocialLink;
