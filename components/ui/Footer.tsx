import React from "react";
import Header from "./Header";
import Link from "next/link";

function Footer() {
  return (
    <footer className="h-[50dvh] bg-bronzelog relative">
      <Header isMain={false} />
      <div className="text-back flex flex-row gap-10 mt-10 justify-end mr-10">
        <div>
          <p className="text-xl">Kraków, Kazimierz</p>
          <p className="text-sm leading-3">ul. Nadmostowa 11</p>
          <p className="text-sm">12:00 - 24:00</p>
        </div>
        <div>
          <p>przyjemnoscresto@gmail.com</p>
          <p>012 777 321 777</p>
        </div>
      </div>
      <p className="text-back absolute left-0 bottom-0 m-5">
        Stworzone przez{" "}
        <Link href="https://majkeloess.dev" target="_blank">
          @majkeloess, 2024
        </Link>
      </p>
      <div className="text-back text-sm absolute right-0 bottom-0 m-5 flex flex-row gap-10">
        <p>Nasze social media</p>
        <p>Współpraca</p>
      </div>
    </footer>
  );
}

export default Footer;
