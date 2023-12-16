"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

const CustomFilter = ({ title, option, setFilter }: CustomFilterProps) => {
   const [selected, setSelected] = useState(option[0]);
   const [focus, setFocus] = useState(false);
   const btnRef = useRef<HTMLButtonElement | null>(null);

   useEffect(() => {
      const handleClickOutside = (e: any) => {
         if (
            btnRef.current &&
            !btnRef.current.contains(e.target)
         ) {
            setFocus(false);
         } else {
            setFocus(true);
         }
      };

      window.addEventListener('click', handleClickOutside);
      return () => {
         window.removeEventListener('click', handleClickOutside);
      };
   }, []);

   return (
      <div className="w-fit">
         <div className="relative w-fit z-10">
            <button className="custom-filter__btn" ref={btnRef}>
               <span className="block truncate">
                  {selected.title}
               </span>
               <Image src="/chevron-up-down.svg" width={20} height={20} className="ml-4 object-contain" alt="chevron up down" />
            </button>
            <div className="custom-filter__options">
               {focus && (option.map((option) => (
                  <div key={option.title}
                     className={`relative cursor-default select-none py-2 px-4 hover:bg-primary-blue hover:text-white ${
                        selected.title === option.title ? `bg-primary-blue text-white` : ''
                     }`}
                     onClick={() => {setSelected(option); setFilter(option.title)}}>
                     <span>{option.title}</span>
                  </div>
               )))}
            </div>
         </div>
      </div>
   )
}

export default CustomFilter