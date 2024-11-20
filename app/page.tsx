import Kontakt from "@/components/subpages/Kontakt";
import Menu from "@/components/subpages/Menu";
import Onas from "@/components/subpages/Onas";
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
          <MainArrow />
        </div>
      </section>
      <section className="w-full">
        <Image
          src="/m.png"
          alt="main-photo"
          className="w-full"
          width={2382}
          height={773}
        />
      </section>
      <Menu />
      <Onas />
      <Kontakt />
    </div>
  );
}
