"use client";

import { CartList, CustomButton } from "@/components";
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addCartList } from "@/utils";

const Cart = () => {
   const [cart, setCart] = useState<string[]>([]);
   const [cartSeccond, setCartSeccond] = useState<string[]>([]);
   const [loading, setLoading] = useState(false);
   const [buttonReload, setButtonReload] = useState(false);
   const [card, setCard] = useState(false);
   const router = useRouter();

   const handleReload = () => {
      setButtonReload(false);
      setCard(true);
      const cartsession = window.sessionStorage.getItem('cart');
      if (cartsession) {
         const arrays = cartsession.split(';');
         arrays.forEach((value, index) => {
            arrays[index] = JSON.parse(value);
         })
         setCartSeccond(arrays);
      }
   }

   const handleUpdateCart = async () => {
      const name = window.localStorage.getItem('name');

      if (!name) {
         router.push("/login");
      } else {
         let strings = "";
         if (cartSeccond.length > 0) {
            cartSeccond.forEach((value) => {
               strings += JSON.stringify(value) + ';';
            })
            strings = strings.substring(0, strings.length - 1);
         }
         const result = await addCartList(name, strings);
         if (strings !== window.sessionStorage.getItem("cart")) {
            window.sessionStorage.setItem("cart", strings);
            window.localStorage.setItem("cart", strings);
            const cartsession: any = window.sessionStorage.getItem("cart");
            if(cartsession !== ""){
               const arrays = cartsession.split(';');
               arrays.forEach((value: any, index: any) => {
                  arrays[index] = JSON.parse(value);
               })
               setCart(arrays);
            }else{
               setCart([]);
            }
            handleReload();
         }
         alert("Update successful.")
      }
   }

   async function loadCart() {
      setLoading(true);
      const cartsession = window.sessionStorage.getItem('cart');
      const cartlocal = window.localStorage.getItem('cart')

      if (cartsession) {
         const arrays = cartsession.split(';');
         const arrayss = cartsession.split(';');
         arrays.forEach((value, index) => {
            arrays[index] = JSON.parse(value);
            arrayss[index] = JSON.parse(value);
         })
         setCart(arrays);
         setCartSeccond(arrayss);
         setLoading(false);
      } else {
         if (cartlocal) {
            const arrays = cartlocal.split(';');
            const arrayss = cartlocal.split(';');
            arrays.forEach((value, index) => {
               arrays[index] = JSON.parse(value);
               arrayss[index] = JSON.parse(value);
            })
            setCart(arrays);
            setCartSeccond(arrayss);
            setLoading(false);
         }
      }
   }

   useEffect(() => {
      if (!buttonReload) {
         setCard(false);
      }
   }, [buttonReload])

   useEffect(() => {
      loadCart();
   }, [])

   return (
      <>
         <div className="fixed z-20 left-0 top-0 flex w-full justify-between bg-[#ffffff91] flex-wrap max-[900px]:gap-3">
            <div className='home__text-container'>
               <h1 className='text-4xl font-extrabold'>
                  Cart List
               </h1>
            </div>
            <div className="flex gap-5 flex-wrap max-[900px]:gap-2">
               {
                  (buttonReload)
                  && (
                     <CustomButton
                        title="Reload"
                        containerStyles="bg-primary-blue rounded-full text-white"
                        handleClick={handleReload}
                     />
                  )
               }
               <Link href="/">
                  <CustomButton
                     title="Return"
                     containerStyles="bg-primary-blue rounded-full text-white"
                  />
               </Link>
               <CustomButton
                  title="Update Cart"
                  containerStyles="bg-primary-blue rounded-full text-white"
                  handleClick={handleUpdateCart}
               />
            </div>
         </div>

         {cart.length > 0 ? (
            <section>
               <div className='home__cars-wrapper max-[900px]:mt-[5rem]'>
                  {cart?.map((value) => <CartList car={value} setReload={setButtonReload} card={card} setCartSeccond={setCartSeccond} />)}
               </div>
               {loading && (
                  <div className="mt-16 w-full flex-center">
                     <Image
                        src="/loader.gif"
                        alt="loader"
                        width={50}
                        height={50}
                        className="object-contain"
                     />
                  </div>
               )}
               {/* <ShowMore
                pageNumber={limit / 10}
                isNext={limit > allCars.length}
                setLimit={setLimt} /> */}
            </section>
         ) : (
            <div className='home__error-container max-[900px]:mt-[8rem]'>
               <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            </div>
         )}
      </>
   )
}

export default Cart