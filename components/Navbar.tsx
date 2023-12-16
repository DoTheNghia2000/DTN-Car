import Image from "next/image"
import Link from "next/link"
import { CustomButton } from "."
import { useEffect, useState } from "react";


const Navbar = ({ countcart, setCountcart }: any) => {
   const [button, setButton] = useState<JSX.Element>();

   function removeValuesFromArray(array1: [], array2: []) {
      return array1.filter(value => {
         const index = array2.indexOf(value);
         if (index !== -1) {
            array2.splice(index, 1);
            return false;
         }
         return true;
      });
   }

   const handleSignout = () => {
      const cart: any = window.sessionStorage.getItem('cart');
      const cartlocal: any = window.localStorage.getItem('cart');

      if (cart && cartlocal) {
         const arraysession = cart.split(';');
         const arraylocal = cartlocal.split(';');
         let strings = "";

         const resultArray = removeValuesFromArray(arraysession, arraylocal);
         console.log(resultArray)
         setCountcart(resultArray.length);
         resultArray.forEach((value) => {
            strings += value + ';';
         })
         strings = strings.substring(0, strings.length - 1);

         window.sessionStorage.setItem('cart', strings);
         window.localStorage.removeItem("name");
         window.localStorage.removeItem("cart");
      } else {
         if (cart) {
            const arraysession = cart.split(';');
            setCountcart(arraysession.length);
         } else {
            setCountcart(0);
         }
         window.localStorage.removeItem("name");
         window.localStorage.removeItem("cart");
      }

      setButton(
         <Link href="/login">
            <CustomButton
               title="Sign In"
               btnType="button"
               containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            />
         </Link>
      )
   }

   useEffect(() => {
      const name = window.localStorage.getItem('name');
      const cart = window.sessionStorage.getItem('cart');
      const cartlocal = window.localStorage.getItem('cart');

      if (cart) {
         const length = cart.split(';').length;
         setCountcart(length);
      } else {
         if (cartlocal) {
            const length = cartlocal.split(';').length;
            setCountcart(length);
         }
      }

      if (name) {
         setButton(
            <>
               <CustomButton
                  title="Sign out"
                  btnType="button"
                  containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                  handleClick={handleSignout}
               />
            </>
         )
      } else {
         setButton(
            <>
               <Link href="/login">
                  <CustomButton
                     title="Sign In"
                     btnType="button"
                     containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                  />
               </Link>
            </>
         )
      }
   }, [])


   return (
      <header className="w-full fixed top-0 bg-[#ffffff91] z-[11]">
         <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-6 px-6 py-4">
            <Link href="/" className="flex justify-center items-center">
               <Image src="/logo.svg" alt="logo" width={118} height={18} className="object-contain" />
            </Link>
            <div className="flex">
               {button}
               <Link href="/cart">
                  <div className="relative">
                     <span className="absolute text-white font-bold bg-primary-blue text-center 
                  rounded-full w-[20px] h-[20px] text-[12px] right-0 top-0 leading-5">{countcart}</span>
                     <Image src="/cart.png" alt="cart" width={50} height={30} className="scale-[0.6] cursor-pointer" />
                  </div>
               </Link>
            </div>
         </nav>
      </header>
   )
}

export default Navbar