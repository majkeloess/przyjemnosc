import Link from "next/link";
import React from "react";

function Button({ text, link = "" }: { text: string; link?: string }) {
  return (
    <Link href={link}>
      <button className="text-bronzelog border-[2px] border-bronzelog px-6 py-2 rounded-full">
        {text}
      </button>
    </Link>
  );
}

export default Button;
