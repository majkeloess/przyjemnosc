import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

function Button({
  text,
  link = "",
  type = "button",
  onClick,
}: {
  text: string;
  link?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
}) {
  return (
    <Link href={link}>
      <button
        type={type}
        className="text-bronzelog border-[2px] border-bronzelog px-6 py-2 rounded-full"
        onClick={onClick}
      >
        {text}
      </button>
    </Link>
  );
}

export default Button;
