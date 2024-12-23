"use client";
import React, { useState } from "react";
import MenuItem from "../main-page/MenuItem";

function Menu({ menuItems }: { menuItems: any[] }) {
  const [current, setIsCurrent] = useState<string>("");

  return (
    <section id="menu">
      <div onClick={() => setIsCurrent("Przystawki")}>
        <MenuItem
          name="Przystawki"
          current={current}
          items={menuItems.filter((e) => e.type === "przystawki")}
        />
      </div>
      <div onClick={() => setIsCurrent("Sałatki")}>
        <MenuItem
          name="Sałatki"
          current={current}
          items={menuItems.filter((e) => e.type === "salatki")}
        />
      </div>
      <div onClick={() => setIsCurrent("Zupy")}>
        <MenuItem
          name="Zupy"
          current={current}
          items={menuItems.filter((e) => e.type === "zupy")}
        />
      </div>
      <div onClick={() => setIsCurrent("Mięsa")}>
        <MenuItem
          name="Mięsa"
          current={current}
          items={menuItems.filter((e) => e.type === "miesa")}
        />
      </div>
      <div onClick={() => setIsCurrent("Ryby")}>
        <MenuItem
          name="Ryby"
          current={current}
          items={menuItems.filter((e) => e.type === "ryby")}
        />
      </div>
      <div onClick={() => setIsCurrent("Regionalne")}>
        <MenuItem
          name="Regionalne"
          current={current}
          items={menuItems.filter((e) => e.type === "regionalne")}
        />
      </div>
      <div onClick={() => setIsCurrent("Dodatki")}>
        <MenuItem
          name="Dodatki"
          current={current}
          items={menuItems.filter((e) => e.type === "dodatki")}
        />
      </div>
      <div onClick={() => setIsCurrent("Napoje")}>
        <MenuItem
          name="Napoje"
          current={current}
          items={menuItems.filter((e) => e.type === "napoje")}
        />
      </div>
    </section>
  );
}

export default Menu;
