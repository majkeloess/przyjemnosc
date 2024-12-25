import NavMain from "@/components/main-page/NavMain";
import Kontakt from "@/components/subpages/Kontakt";
import Menu from "@/components/subpages/Menu";
import Onas from "@/components/subpages/Onas";
import MainArrow from "@/components/ui/MainArrow";
import Image from "next/image";
import { getMenuItems } from "@/lib/queries";

export default async function Home() {
  const menuItems = await getMenuItems();
  return (
    <>
      <NavMain />
      <div className="xl:mt-12 mt-4">
        <div className="flex flex-row justify-between">
          <section className="flex flex-col xl:flex-row xl:justify-between xl:ml-4 ml-2">
            <div className="w-full xl:w-5/12">
              <h2 className="uppercase w-full xl:w-[70%]  text-2xl font-medium">
                Zasmakuj wyjątkowoścci w każdym detalu. Przyjdź i poczuj magię
                miejsca gdzie tradycja splata się z paską, a atmosfera zaprasza
                do relaksu i radości ze wspólnych chwil.
              </h2>
            </div>
            <div className="w-full xl:w-5/12">
              <h3 className="w-full xl:w-[70%] my-4 xl:mt-0">
                Inspirując się bogatym dziedzictwem polskiej kuchni, kreujemy
                dania, które podbiją serca zarówno miłośników klasyki, jak i
                poszukiwaczy kulinarnych uniesień. Od delikatnych pierogów,
                przez aromatyczny żurek, aż po soczyste mięsa pieczone na
                tradycyjnych recepturach — każde danie to opowieść o polskiej
                gościnności i kulinarnym kunszcie.
              </h3>
            </div>
            <div className="hidden xl:block">
              <MainArrow />
            </div>
          </section>
          <div className="xl:hidden">
            <MainArrow />
          </div>
        </div>
        <section className="w-full h-[30dvh] xl:h-auto">
          <Image
            src="/m.png"
            alt="main-photo"
            className="w-full h-full object-cover"
            width={2382}
            height={773}
            priority
          />
        </section>
        <Menu menuItems={menuItems} />
        <Onas />
        <Kontakt />
      </div>
    </>
  );
}
