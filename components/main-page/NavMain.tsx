import Link from "next/link";
import React from "react";

function NavMain() {
  return (
    <nav className="flex flex-row justify-between mx-4 ">
      <ul className="flex flex-row gap-10 text-fontcolor">
        <Link href="/menu">
          <li>Menu</li>
        </Link>
        <Link href="/rezerwacje">
          <li>Rezerwacje</li>
        </Link>
        <Link href="/onas">
          <li>O nas</li>
        </Link>
        <Link href="/kontakt">
          <li>Kontakt</li>
        </Link>
      </ul>
      <ul className="flex flex-row gap-10 text-fontcolor">
        <li>Pl / En</li>
        <li>012 777 321 777</li>
      </ul>
    </nav>
  );
}

export default NavMain;
