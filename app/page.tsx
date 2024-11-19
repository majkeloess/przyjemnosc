import MainArrow from "@/components/ui/MainArrow";

export default function Home() {
  return (
    <div>
      <header>
        <h1 className="text-[13vw] leading-[24vh] font-bold text-bronzelog">
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
      <section className="flex flex-row justify-between">
        <div>
          <h2 className="uppercase"> </h2>
        </div>
        <div>
          <h3></h3>
        </div>
        <div>
          {/* <p className="rotate-90">Nasze menu</p> */}
          <MainArrow />
        </div>
      </section>
    </div>
  );
}
