"use client";

import { CustomButton } from "@/components"
import { fetchCartList, fetchUser } from "@/utils"
import Link from "next/link";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

const Signin = () => {
   const [username, setUername] = useState('');
   const [password, setPassword] = useState('');

   const router = useRouter();

   const getUser = async () => {
      const result = await fetchUser(username, password);
      if (result) {
         let cartsession = window.sessionStorage.getItem("cart");
         const cartlist = await fetchCartList(result);
         console.log(result, cartlist)
         if (cartsession) {
            if (cartlist !== "") {
               window.localStorage.setItem("cart", cartlist);
               cartsession += ';' + cartlist;
            }
            window.sessionStorage.setItem("cart", cartsession);
         } else {
            if (cartlist !== "") {
               window.localStorage.setItem("cart", cartlist);
               window.sessionStorage.setItem("cart", cartlist);
            }
         }
         router.push("/")
      } else {
         alert("Please check your account username or password again.")
      }
   }

   const handleFormsubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      getUser();
   }

   useEffect(() => {
      const name = window.localStorage.getItem('name');
      if (name) {
         router.push("/")
      }
   }, [])

   return (
      <>
         <div className="w-full h-full fixed top-0 left-0 flex">
            <div className="w-full bg-[#fff7f7] px-[15px] min-h-full flex items-center content-center">
               <div className='form_inner bg-[#fff] p-[50px] max-w-[550px] w-full my-0 mx-auto overflow-hidden text-center'>
                  <h1 className='mb-[10px] text-[35px] font-[700]'><span className='text-[#ff002b]'>CAR</span>HUB</h1>
                  <h2 className='mb-[25px] text-[20px] text-[#313131] font-[500]'>Sign Into Your Account</h2>
                  <form action="#" onSubmit={handleFormsubmit}>
                     <input type="text" name='username' className='px-[10px] py-[20px] text-[15px] h-[55px] outline-none 
               text-[#616161] rounded-[3px] border border-solid border-[#efeded] bg-[#efeded] w-full mb-[25px]' placeholder='User Name' required
                        value={username} onChange={e => setUername(e.target.value)} />
                     <input type="password" name='password' className='px-[10px] py-[20px] text-[15px] h-[55px] outline-none 
               text-[#616161] rounded-[3px] border border-solid border-[#efeded] bg-[#efeded] w-full mb-[25px]' placeholder='Password' required
                        value={password} onChange={e => setPassword(e.target.value)} />
                     <CustomButton
                        title='LOGIN'
                        btnType='submit'
                        containerStyles='bg-[#ff002b] cursor-pointer h-[55px] text-[#fff] tracking-[0.5px] text-[16px] border-0 w-full rounded-[3px] font-[500] mb-[25px]'
                     />
                  </form>
                  <p>Don't have an account? &nbsp;<Link href="/register"><span>Register here</span></Link></p>
               </div>
            </div>
         </div>
      </>
   )
}

export default Signin