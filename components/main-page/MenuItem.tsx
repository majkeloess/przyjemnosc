import React from "react";
import RightArrow from "../ui/RightArrow";
import DiagonalArrow from "../ui/DiagonalArrow";
import type { MenuItem } from "@/types/types";

function MenuItem({
  name,
  current,
  items,
}: {
  name: string;
  current: string;
  items: MenuItem[];
}) {
  return (
    <>
      {current != name ? (
        <div className="w-full xl:h-[10dvh] h-[7dvh] border-graycolor border-b-[1px] flex justify-center items-center">
          <h3 className="text-2xl uppercase font-medium">{name}</h3>
          <div className="absolute right-10">
            <DiagonalArrow />
          </div>
        </div>
      ) : (
        <div className="w-full bg-bronzelog flex xl:flex-row flex-col items-center">
          <div className="flex flex-row justify-between">
            <h3 className="xl:w-6/12 w-full text-[7dvw] font-medium uppercase text-back">
              {name}
            </h3>
          </div>
          <div className="xl:w-2/12 w-full xl:my-6 my-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between items-center text-back mx-10 xl:mx-0"
              >
                <p className="xl:text-lg text-md">{item.name}</p>
                <p className="xl:text-lg text-md whitespace-nowrap">
                  {item.price} PLN
                </p>
              </div>
            ))}
          </div>
          <div className="absolute right-10 hidden xl:block">
            <RightArrow />
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItem;
