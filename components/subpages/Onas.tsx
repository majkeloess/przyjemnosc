import Image from "next/image";
import React from "react";
import Button from "../ui/Button";

function Onas() {
  return (
    <section id="onas" className="mt-12 mx-5">
      <div className="flex flex-row items-end">
        <p className="w-1/2">Polska tradycja</p>
        <h2 className="w-1/2 text-[2.2vw] text-medium text-fontcolor uppercase leading-10">
          Nasze dania to nie tylko jedzenie,{" "}
        </h2>
      </div>
      <div>
        <h2 className="text-[2.2vw] text-medium text-fontcolor uppercase leading-10">
          ale także podróż przez historię i kulturę naszego kraju.
        </h2>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 mt-12 gap-6">
        <div className="row-span-3 col-span-1 relative">
          <Image
            src="/schabowy.jpg"
            alt="schabowy"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="row-span-1 col-span-1">
          <p className="text-fontcolor">
            Naszym celem jest przybliżenie Ci prawdziwego smaku Polski -
            tradycyjnych receptur wzbogaconych odrobiną nowoczesności.
            Niezależnie od tego, czy chcesz zasmakować w domowym obiedzie, czy
            nasze interpretacje znanych klasyków.
          </p>
          <div className="my-6">
            <Button text="Zarezerwuj stolik!" link="/rezerwacje" />
          </div>
        </div>
        <div className="row-span-2 col-span-1 flex flex-row justify-center gap-6">
          <Image src="/pierogi.png" alt="pierogi" width={400} height={200} />
          <Image src="/kurczak.png" alt="kurczak" width={300} height={200} />
        </div>
      </div>
    </section>
  );
}

export default Onas;
