import MainArrow from "@/components/ui/MainArrow";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header>
        <h1 className="text-[13.5vw] leading-[24vh] font-manrope font-semibold text-bronzelog">
          PRZYJEMNOSC
        </h1>
      </header>
      <nav className="flex flex-row justify-between mx-4 ">
        <ul className="flex flex-row gap-10 text-fontcolor">
          <li>Menu</li>
          <li>Rezerwacje</li>
          <li>O nas</li>
          <li>Kontakt</li>
        </ul>
        <ul className="flex flex-row gap-10 text-fontcolor">
          <li>Pl / En</li>
          <li>012 777 321 777</li>
        </ul>
      </nav>
      <section className="flex flex-row justify-between mt-16">
        <div className=" w-5/12">
          <h2 className="w-[70%] uppercase text-3xl leading-[30px] font-medium text-fontcolor mx-4">
            Zasmakuj wyjątkowości w każdym detalu. Przyjdź i poczuj magię
            miejsca, gdzie tradycja splata się z pasją, a atmosfera zaprasza do
            relaksu i radości ze wspólnych chwil.{" "}
          </h2>
        </div>
        <div className="w-5/12">
          <h3 className="w-[70%]">
            Inspirując się bogatym dziedzictwem polskiej kuchni, kreujemy dania,
            które podbiją serca zarówno miłośników klasyki, jak i poszukiwaczy
            kulinarnych uniesień. Od delikatnych pierogów, przez aromatyczny
            żurek, aż po soczyste mięsa pieczone na tradycyjnych recepturach —
            każde danie to opowieść o polskiej gościnności i kulinarnym
            kunszcie.
          </h3>
        </div>
        <div>
          {/* <p className="rotate-90">Nasze menu</p> */}
          <MainArrow />
        </div>
      </section>
      <section className="w-full flex justify-center">
        <Image
          src="/m.png"
          alt="main-photo"
          className="w-full mx-4"
          width={1200}
          height={400}
        />
      </section>
    </div>
  );
}
