import NavMain from "@/components/main-page/NavMain";
import Header from "@/components/ui/Header";
import MainArrow from "@/components/ui/MainArrow";

export default function Home() {
  return (
    <div>
      <Header />
      <NavMain />
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
