import React, { useEffect, useState } from 'react'
import userWhite from '../assets/user-white.png'
import email1 from '../assets/email-1.png'
import password1 from '../assets/password-1.png'
import eye1 from '../assets/eye-2.png'
import eye3 from '../assets/eye-4.png'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const USER_API_BUILD="https://json-server-sigma-black.vercel.app/User"
function Signin() {
    const navigate=useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState("");
    const  [showPassword, setShowPassword] = useState(false)
    const showPassHandler=()=>{
        setShowPassword(!showPassword)
    }

    const changeEmailHandler=(e)=>{
        setEmail(e.target.value)
    }  
    const changePasswordHandler=(e)=>{
        setPassword(e.target.value)
    }  
      useEffect(() => {
        const getData = async () => {
            try {
              const { data } = await axios.get(USER_API_BUILD);
              setUsers(data);
            } catch (error) {
              toast.error(error.message)
            }
          };
         getData();
      }, []);

    const isValidate = () => {
        let result = true;
        if (email === "" || email === null) {
          result = false;
          toast.warning("Please enter an Email.");
        }
        if (password === "" || password === null) {
          result = false;
          toast.warning("Please enter a password.");
        }
        return result;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (isValidate()){
        const user = users.filter((item) => item.id == email);
        if (user.length !== 0) {
          if (password === user[0].password) {
            toast.success("logged in")
            localStorage.setItem("user", JSON.stringify(user[0]));
            setEmail("");
            setPassword("");
            navigate("/");
          } else {
            toast.error("Wrong Password! Try Again")
          }
        } else {
          toast.error("This Username is not Registered! Please Sign Up First")
        }
        }
      };
  return (
    <section className="h-screen w-full flex items-center justify-center bg-white gap-x-8 dark:bg-[#303030] ">
    <div className="absolute container max-w-[430px] w-full p-8 rounded-lg bg-[#f8f9fa] mx-4 xs:py-5 xs:px-2.5 shadow-[0_0.5rem_1rem_rgba(0,0,0,.15)] login dark:bg-[#424242]">
        <div className=" p-4">
            <div className='flex items-center justify-center mt-5'>
                <div className='rounded-[50%] bg-[#007bff] w-20 h-20 flex items-center justify-center '>
                    <img src={userWhite} alt="" className='w-10 h-10' />
                </div>
            </div>
            
            <header className='text-3xl font-semibold text-center text-[#232836] mt-5 dark:text-white'>Login</header>
            <form className='mt-8' action="#">
                <div className="relative h-12 w-full mt-5 rounded-md bg-white ">
                    <img src={email1} alt="" className=' w-4 h-4 absolute top-4 left-1.5' />
                    <input id='email' name='email' value={email} onChange={changeEmailHandler} type="email" placeholder="Email" className="pl-6 w-full h-full text-base rounded-md outline-none px-4 border border-[#CACACA] focus:border-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#303030] dark:text-white"/>
                </div>
                <div className="relative h-12 w-full mt-5 rounded-md bg-white ">
                    <img src={password1} alt="" className=' w-4 h-4 absolute top-4 left-1.5' />
                    <input id='password' name='password' value={password} onChange={changePasswordHandler} type={showPassword ? "text" : "password" } placeholder="Confirm password" className="pl-6 w-full h-full text-base rounded-md outline-none px-4 border border-[#CACACA] focus:border-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#303030] dark:text-white"/>
                    <div onClick={showPassHandler} title='show password'> 
                        <img src={eye1} alt="" className={clsx('w-6 h-6 absolute top-3 right-2 cursor-pointer p-1 hover:brightness-75',showPassword?'block':'hidden')} />
                        <img src={eye3} alt="" className={clsx('w-6 h-6 absolute top-3 right-2 cursor-pointer p-1  hover:brightness-75',!showPassword?'block':'hidden')}/>    
                    </div> 
                </div>

                <div className="relative h-12 w-full mt-5 rounded-md button-field">
                    <button onClick={submitHandler} className='h-full w-full text-base rounded-md text-white bg-[#007bff] transition-all hover:bg-[#016dcb]'>Login</button>
                </div>
            </form>
            <div className="mt-3 text-center text-[#232836] text-sm dark:text-white">
                <span>Don't have an account? <Link to="/signup" className="text-[#007bff] no-underline hover:underline link signup-link">Signup</Link></span>
            </div>
        </div>
    </div>
    <ToastContainer/>
    </section>
  )
}

export default Signin