import Link from "next/link";
import React from "react";

function NavMain() {
  return (
    <nav className="flex flex-row justify-between xl:mx-4 mx-2 ">
      <ul className="flex flex-row xl:gap-10 gap-4 text-fontcolor text-sm xl:text-base">
        <Link href="#menu">
          <li>Menu</li>
        </Link>
        <Link href="/rezerwacje">
          <li> Rezerwacje</li>
        </Link>
        <Link href="#onas">
          <li>O nas</li>
        </Link>
        <Link href="#kontakt">
          <li>Kontakt</li>
        </Link>
      </ul>
      <ul className="hidden xl:flex flex-row gap-10 text-fontcolor">
        <li>Pl / En</li>
        <li>012 777 321 777</li>
      </ul>
    </nav>
  );
}

export default NavMain;
