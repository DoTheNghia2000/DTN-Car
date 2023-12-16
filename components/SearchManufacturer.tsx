"use client";

import Image from "next/image"
import { useState, useRef, useEffect } from "react"

import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types"

const SearchManufacturer = ({ selected, setSelected }: SearchManufacturerProps) => {
   const [focus, setFocus] = useState(false);

   const inputRef = useRef<HTMLInputElement | null>(null);

   const filterManufacturers =
      focus
         ? manufacturers.filter((item) => (
            item.toLowerCase().replace(/\s+/g, "").includes(selected.toLowerCase().replace(/\s+/g, ""))
         ))
         : []

   useEffect(() => {
      const handleClickOutside = (e: any) => {
         if (
            inputRef.current &&
            !inputRef.current.contains(e.target)
         ) {
            setFocus(false);
         }else{
            setFocus(true);
         }
      };

      window.addEventListener('click', handleClickOutside);
      return () => {
         window.removeEventListener('click', handleClickOutside);
      };
   }, []);

   return (
      <div className="search-manufacturer">
         <div className="relative w-full">
            <Image src="/car-logo.svg" width={20} height={20} className="ml-4 top-[14px] absolute" alt="Car Logo" />
            <input type="text" className="search-manufacturer__input"
               placeholder="Volkswagen"
               value={selected}
               onChange={(e) => setSelected(e.target.value)}
               ref={inputRef} />

            <div className="overflow-x-hidden overflow-y-scroll w-full absolute max-h-[400px] z-[11] bg-white shadow-lg">
               {filterManufacturers.map((item) => (<div key={item} onClick={() => setSelected(item)}
                     className="relative search-manufacturer__option hover:bg-primary-blue hover:text-white">
                     {item}
                  </div>))}
            </div>
         </div>
      </div>
   )
}

export default SearchManufacturer