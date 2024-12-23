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
        <div className="w-full h-[10dvh] border-graycolor border-b-[1px] flex justify-center items-center">
          <h3 className="text-2xl uppercase font-medium">{name}</h3>
          <div className="absolute right-10">
            <DiagonalArrow />
          </div>
        </div>
      ) : (
        <div className="w-full bg-bronzelog flex flex-row items-center">
          <h3 className="w-6/12 text-[7dvw] font-medium uppercase text-back">
            {name}
          </h3>
          <div className="w-2/12 my-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-row justify-between items-center text-back"
              >
                <p className="text-lg">{item.name}</p>
                <p className="text-md whitespace-nowrap">{item.price} PLN</p>
              </div>
            ))}
          </div>
          <div className="absolute right-10">
            <RightArrow />
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItem;
