import MainArrow from "@/components/ui/MainArrow";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="flex flex-row justify-between">
        <div>
          <h2 className="uppercase"> </h2>
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
