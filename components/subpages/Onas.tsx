import Image from "next/image";
import React from "react";

function Onas() {
  return (
    <section id="onas" className="mt-12 mx-5">
      <div className="flex flex-row items-end">
        <p className="w-1/2">Polska tradycja</p>
        <h2 className="w-1/2 text-[2.5vw] text-medium text-fontcolor uppercase leading-10">
          Nasze dania to nie tylko jedzenie,{" "}
        </h2>
      </div>
      <div>
        <h2 className="text-[2.5vw] text-medium text-fontcolor uppercase leading-10">
          ale także podróż przez historię i kulturę naszego kraju. Naszym celem
          jest przybliżenie Ci prawdziwego smaku Polski – tradycyjnych receptur
          wzbogaconych odrobiną nowoczesności. Niezależnie od tego, czy chcesz
          zasmakować w domowym obiedzie, czy nasze interpretacje znanych
          klasyków.
        </h2>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 mt-12">
        <div className="row-span-3 col-span-1">
          <Image src="/pierogi.png" alt="pierogi" width={628} height={702} />
        </div>
      </div>
    </section>
  );
}

export default Onas;
