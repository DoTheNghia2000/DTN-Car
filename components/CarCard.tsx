"use client";

import Image from "next/image";
import { useState } from "react";

import { CarCardProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import { CarDetails, CustomButton } from ".";

const CarCard = ({ car, setCountcart, countcart }: CarCardProps) => {
   const { city_mpg, year, make, model, transmission, drive } = car;

   const [isOpen, setIsOpen] = useState(false);

   const CarRent = calculateCarRent(city_mpg, year);

   const handleCart = () => {
      const newCountcart = countcart + 1;
      if (countcart === 0) {
         window.sessionStorage.setItem("cart", JSON.stringify(car))
      } else {
         const session = JSON.stringify(car) + ';' + window.sessionStorage.getItem("cart");
         window.sessionStorage.setItem("cart", session);
      }
      setCountcart(newCountcart);
   }

   return (
      <div className="car-card group relative">
         <div className="car-card__content">
            <h2 className="car-card__content-title">
               {make} {model}
            </h2>
         </div>

         <p className="flex mt-6 text-[32px] font-extrabold">
            <span className="self-start text-[14px] font-semibold">$</span>
            {CarRent}
            <span className="self-end text-[14px] font-medium">/day</span>
         </p>

         <div className="relative w-full h-40 my-3 object-contain">
            <Image src={generateCarImageUrl(car)} alt="car model" fill priority className="object-contain" />
         </div>

         <div className="relative flex w-full mt-2">
            <div className="flex group-hover:invisible w-full justify-between">
               <div className="flex flex-col justify-center items-center gap-2">
                  <Image src="/steering-wheel.svg" width={20} height={20} alt="steering wheel" />
                  <p className="text-[14px]">
                     {transmission === 'a' ? 'Automatic' : "Manual"}
                  </p>
               </div>

               <div className="flex flex-col justify-center items-center gap-2">
                  <Image src="/tire.svg" width={20} height={20} alt="tire" />
                  <p className="text-[14px]">
                     {drive.toUpperCase()}
                  </p>
               </div>

               <div className="flex flex-col justify-center items-center gap-2">
                  <Image src="/gas.svg" width={20} height={20} alt="gas" />
                  <p className="text-[14px]">
                     {city_mpg} MPG
                  </p>
               </div>
            </div>

            <div className="car-card__btn-container">
               <CustomButton
                  title="View More"
                  containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                  textStyles="text-white text-[14px] leading-[17px] font-bold"
                  rightIcon="/right-arrow.svg"
                  handleClick={() => setIsOpen(true)}
               />
            </div>
         </div>

         <div className="absolute left-0 top-0 h-full w-full hidden group-hover:flex items-center justify-center rounded-[1.5rem] overflow-hidden bg-[#ffffff52]">
            <span className="bg-[#eedddd93] w-[80px] h-[80px] rounded-full cursor-pointer flex items-center justify-center -translate-y-8">
               <Image src="/cart.png" alt="cart" width={45} height={45} onClick={handleCart} />
            </span>
         </div>

         <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
      </div>
   )
}

export default CarCard