import React from "react";
import pepe from "../Images/pepe.png";
import Post from "./Post";
export const Contributions = (props) => {
  const contribs = props.data;
  return (
    <div className="flex flex-col">
      <div className="flex justify-center  underline text-red-100 font-Carnivalee text-4xl drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 py-2 pb-10 opacity-80">
        Clown's Contributions
        <img src={pepe} height={70} width={70} alt="pepe" />
      </div>
      <div className="w-full justify-center">
        <div className="flex justify-center">
          <div className="grid grid-cols-3 w-7/12">
            {
              contribs.length > 0 ?
            contribs.map((contrib) => (
              <Post content={contrib.content} desc={contrib.description} />
            )):<p className="font-Carnivale w-72">No Contributions yet</p>}
            
          </div>
        </div>
      </div>
    </div>
  );
};
