import React from "react";
import Header from "./Header";
import Link from "next/link";

function Footer() {
  return (
    <footer className="xl:h-[50dvh] h-[30dvh] bg-bronzelog relative">
      <Header isMain={false} />
      <div className="text-back flex xl:flex-row flex-col gap-10 xl:mt-10 ml-2 xl:ml-5  mr-10">
        <div>
          <p className="text-xl">Kraków, Kazimierz</p>
          <p className="text-sm leading-3">ul. Nadmostowa 11</p>
          <p className="text-sm">12:00 - 24:00</p>
        </div>
        <div>
          <p>przyjemnoscresto@gmail.com</p>
          <p>012 777 321 777</p>
          <p className="xl:hidden block text-back xl:m-5">
            Stworzone przez{" "}
            <Link href="https://majkeloess.dev" target="_blank">
              @majkeloess, 2024
            </Link>
          </p>
        </div>
      </div>
      <p className="hidden text-back xl:block absolute left-0 bottom-0 xl:m-5 m-2">
        Stworzone przez{" "}
        <Link href="https://majkeloess.dev" target="_blank">
          @majkeloess, 2024
        </Link>
      </p>
      <div className="hidden xl:flex text-back text-sm absolute right-0 bottom-0 m-5 flex-row gap-10">
        <p>Nasze social media</p>
        <p>Współpraca</p>
      </div>
    </footer>
  );
}

export default Footer;
