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
      <div className="flex flex-row gap-6 mt-12">
        <div className="w-1/2">
          <Image
            src="/schabowy.jpg"
            alt="schabowy"
            width={500}
            height={500}
            className="w-full"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <div>
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
          <div>
            <div className="w-full">
              <Image
                src="/kazimierz.jpg"
                alt="kazimierz"
                width={500}
                height={400}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Onas;
