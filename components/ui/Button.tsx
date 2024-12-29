import Link from "next/link";
import React from "react";

function Button({
  text,
  link = "",
  type = "button",
}: {
  text: string;
  link?: string;
  type?: "button" | "submit";
}) {
  return (
    <Link href={link}>
      <button
        type={type}
        className="text-bronzelog border-[2px] border-bronzelog px-6 py-2 rounded-full"
      >
        {text}
      </button>
    </Link>
  );
}

export default Button;
