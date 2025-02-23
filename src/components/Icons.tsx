import Image from "next/image";
import React from "react";

const iconData: Record<string, { src: string; alt: string; isSvg: boolean }> = {
  discord: { src: "/icons/discord.svg", alt: "Discord Icon", isSvg: true },
  "google-meet": {
    src: "/icons/google-meets.svg",
    alt: "Google Meet Icon",
    isSvg: true,
  },
  "yu-credit-dark": {
    src: "/icons/yu-credit-dark.svg",
    alt: "Yu Credit Icon",
    isSvg: true,
  },
  "yu-credit-light": {
    src: "/icons/yu-credit-light.svg",
    alt: "Yu Credit Icon",
    isSvg: true,
  },
};

type IconsProps = {
  type: "discord" | "google-meet" | "yu-credit-dark" | "yu-credit-light";
  className?: string;
};

export const Icons: React.FC<IconsProps> = ({ type, className }) => {
  const icon = iconData[type];

  if (!icon) {
    console.warn(`Icon type "${type}" not found in iconData.`);
    return null;
  }

  const size = icon.isSvg ? 24 : 60;

  return (
    <Image
      src={icon.src}
      alt={icon.alt}
      width={size}
      height={size}
      priority
      className={className}
    />
  );
};
