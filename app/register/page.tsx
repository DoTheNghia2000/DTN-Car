"use client";

import { CustomButton } from "@/components"
import { addUser } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
   const [username, setUername] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState("");
   const router = useRouter();

   const handleAddUser = async () => {
      const result = await addUser(username, password, name);
      console.log(result)
      if(result){
         router.push("/");
      }
   }

   const handleFormsubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      handleAddUser();
   }

   return (
      <>
         <div className="w-full h-full fixed top-0 left-0 flex">
            <div className="w-full bg-[#fff7f7] px-[15px] min-h-full flex items-center content-center">
               <div className='form_inner bg-[#fff] p-[50px] max-w-[550px] w-full my-0 mx-auto overflow-hidden text-center'>
                  <h1 className='mb-[10px] text-[35px] font-[700]'>CARHUB</h1>
                  <h2 className='mb-[25px] text-[20px] text-[#313131] font-[500]'>Create An Account</h2>
                  <form action="#" onSubmit={handleFormsubmit}>
                     <input type="text" className='px-[10px] py-[20px] text-[15px] h-[55px] outline-none 
                  text-[#616161] rounded-[3px] border border-solid border-[#efeded] bg-[#efeded] w-full mb-[25px]' placeholder='Full Name' required
                        value={name} onChange={e => setName(e.target.value)} />
                     <input type="text" className='px-[10px] py-[20px] text-[15px] h-[55px] outline-none 
                  text-[#616161] rounded-[3px] border border-solid border-[#efeded] bg-[#efeded] w-full mb-[25px]' placeholder='User Name' required
                        value={username} onChange={e => setUername(e.target.value)} />
                     <input type="password" className='px-[10px] py-[20px] text-[15px] h-[55px] outline-none 
                  text-[#616161] rounded-[3px] border border-solid border-[#efeded] bg-[#efeded] w-full mb-[25px]' placeholder='Password' required
                        value={password} onChange={e => setPassword(e.target.value)} />
                     <CustomButton
                        title='REGISTER'
                        btnType='submit'
                        containerStyles='bg-[#ff002b] cursor-pointer h-[55px] text-[#fff] tracking-[0.5px] text-[16px] border-0 w-full rounded-[3px] font-[500] mb-[25px]'
                     />
                  </form>
                  <p>Already a member? &nbsp;<Link href="/login"><span>Login here</span></Link></p>
               </div>
            </div>
         </div>
      </>
   )
}

export default Signup