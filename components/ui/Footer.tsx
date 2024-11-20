import React from "react";
import Header from "./Header";
import Link from "next/link";

function Footer() {
  return (
    <footer className="h-[40dvh] bg-bronzelog relative">
      <Header isMain={false} />
      <p className="text-back absolute left-0 bottom-0 m-5">
        Stworzone przez{" "}
        <Link href="https://majkeloess.dev" target="_blank">
          @majkeloess, 2024
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
