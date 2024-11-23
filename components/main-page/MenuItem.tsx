import React from "react";
import RightArrow from "../ui/RightArrow";

function MenuItem({ name, current }: { name: string; current: string }) {
  return (
    <>
      {current != name ? (
        <div className="w-full h-[10dvh] border-graycolor border-b-[1px] flex justify-center items-center">
          <h3 className="text-2xl uppercase font-medium">{name}</h3>
          <div></div>
        </div>
      ) : (
        <div className="w-full bg-bronzelog flex flex-row items-center">
          <h3 className="w-6/12 text-[7dvw] font-medium uppercase text-back">
            {name}
          </h3>
          <div className="w-5/12">
            {/* ITEMS FROM DB */}
            <div className="flex flex-row gap-5 items-center text-back">
              <p className="text-lg">
                Pierogi ruskie na maśle ze smażoną cebulką
              </p>
              <p className="text-md">46 PLN</p>
            </div>
          </div>
          <div className="w-1/12 ">
            <RightArrow />
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItem;
