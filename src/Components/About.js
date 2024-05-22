import React from 'react'
import pepe from "../Images/pepe.png";
export const About = (props) => {
  return (
    <><div className="flex justify-center underline text-red-100 font-Carnivalee text-4xl drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 py-2 pb-10 opacity-80">
    About This Clown
    <img src={pepe} height={70} width={70} alt="pepe" />
  </div>
  {props.data}</>
  )
}
