
import Image from "next/image"
import { CarProps } from "@/types"
import { calculateCarRent, generateCarImageUrl } from "@/utils"
import { useEffect, useState } from "react"
import { CarDetails, CustomButton } from "."

interface CartList {
   car: CarProps,
   card: boolean,
   setReload: any,
   setCartSeccond: any
}

const CartList = ({ car, setReload, card, setCartSeccond }: CartList) => {
   const { city_mpg, year, make, model, transmission, drive } = car;

   const [carCard, setCarCart] = useState(true)
   const [isOpen, setIsOpen] = useState(false);

   const CarRent = calculateCarRent(city_mpg, year);

   const handleCart = () => {
      setCarCart(false);
      setReload(true);
      setCartSeccond((prev: string[]) => {
         let number = 0;
         prev.forEach((value, index) => {
            if (JSON.stringify(value) === JSON.stringify(car)) {
               number = index;
            }
         });
         prev.splice(number, 1);
         return prev;
      })
   }

   useEffect(() => {
      if (card) {
         setCarCart(true);
      }
   }, [card])

   return (
      <>
         {
            (carCard)
            && (
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

                  <div className="absolute left-0 top-0 h-full w-full hidden group-hover:flex items-center justify-center rounded-[1.5rem] overflow-hidden bg-[#cc717152]">
                     <Image src="/delete.png" alt="cart" width={60} height={60} onClick={handleCart} className="cursor-pointer -translate-y-8" />
                  </div>

                  <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
               </div>
            )
         }
      </>
   )
}

export default CartList