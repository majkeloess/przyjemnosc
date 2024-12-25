import React from "react";

function Header({ isMain }: { isMain: boolean }) {
  return (
    <header>
      <h1
        className={`text-[13.5vw] leading-12  xl:leading-[24vh] font-bold ${
          isMain ? "text-bronzelog" : "text-back"
        }`}
      >
        PRZYJEMNOSC
      </h1>
    </header>
  );
}

export default Header;
