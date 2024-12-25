import Image from "next/image";
import React from "react";
import Button from "../ui/Button";

function Onas() {
  return (
    <section id="onas" className="xl:mt-12 mt-4 xl:mx-5">
      <div className="flex flex-row items-end mx-2 xl:mx-0">
        <p className="w-1/2">Polska tradycja</p>
        <h2 className="w-1/2 xl:text-[2.2vw] text-xl text-medium text-fontcolor uppercase xl:leading-10">
          Nasze dania to nie tylko jedzenie,{" "}
        </h2>
      </div>
      <div>
        <h2 className="xl:text-[2.2vw] text-xl text-medium text-fontcolor uppercase xl:leading-10 mx-2 xl:mx-0">
          ale także podróż przez historię i kulturę naszego kraju.
        </h2>
      </div>
      <div className="flex xl:flex-row flex-col gap-6 xl:mt-12 mt-4">
        <div className="w-full xl:w-1/2">
          <Image
            src="/schabowy.jpg"
            alt="schabowy"
            width={500}
            height={500}
            className="w-full"
          />
        </div>
        <div className="w-full xl:w-1/2 flex flex-col justify-between">
          <div>
            <p className="text-fontcolor mx-2 xl:mx-0">
              Naszym celem jest przybliżenie Ci prawdziwego smaku Polski -
              tradycyjnych receptur wzbogaconych odrobiną nowoczesności.
              Niezależnie od tego, czy chcesz zasmakować w domowym obiedzie, czy
              nasze interpretacje znanych klasyków.
            </p>
            <div className="my-6 xl:block flex justify-center">
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
