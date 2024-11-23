"use client";
import React, { useState } from "react";
import MenuItem from "../main-page/MenuItem";
import { MenuType } from "@/types";

function Menu() {
  const [current, setIsCurrent] = useState<MenuType>("");

  return (
    <section id="menu">
      <div onClick={() => setIsCurrent("Przystawki")}>
        <MenuItem name="Przystawki" current={current} />
      </div>
      <div onClick={() => setIsCurrent("Sałatki")}>
        <MenuItem name="Sałatki" current={current} />
      </div>
      <div onClick={() => setIsCurrent("Zupy")}>
        <MenuItem name="Zupy" current={current} />
      </div>
      <div onClick={() => setIsCurrent("Mięsa")}>
        <MenuItem name="Mięsa" current={current} />
      </div>
      <div onClick={() => setIsCurrent("Ryby")}>
        <MenuItem name="Ryby" current={current} />
      </div>
      <div onClick={() => setIsCurrent("Regionalne")}>
        <MenuItem name="Regionalne" current={current} />
      </div>
      <div onClick={() => setIsCurrent("Dodatki")}>
        <MenuItem name="Dodatki" current={current} />
      </div>
      <div onClick={() => setIsCurrent("Napoje")}>
        <MenuItem name="Napoje" current={current} />
      </div>
    </section>
  );
}

export default Menu;
