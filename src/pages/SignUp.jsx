import React, { useEffect } from 'react'
import userWhite from '../assets/user-white.png'
import email1 from '../assets/email-1.png'
import password1 from '../assets/password-1.png'
import password2 from '../assets/password-2.png'
import eye1 from '../assets/eye-2.png'
import eye3 from '../assets/eye-4.png'
import user1 from '../assets/user-1.png'
import { useState } from 'react'
import {clsx} from 'clsx'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const USER_API_BUILD="https://json-server-sigma-black.vercel.app/User"
function SignUp() {

    const [alreadyUser, setAlreadyUser] = useState(false);
    const [repassword,setRepassword]=useState('')
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        password: "",
        email: "",
        lastname: "",
        gender:"",
        number:"",
        city:"",
        age:"",
        id: "",
        image: "",
      });

    const { name, password, email } = user;  
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value, id: email });
      };
    const handleRepassword=(e)=>{
        setRepassword(e.target.value)
    }  

    const  [showPassword, setShowPassword] = useState(false)
    const showPassHandler=()=>{
        setShowPassword(!showPassword)
    }
    
    const IsValidate = () => {
        let isproceed = true;
    
        let errormessage = "Please enter the value in ";
        if (name === "" || name === null) {
          isproceed = false;
          errormessage += "Username,";
        }
        if (password === "" || password === null) {
          isproceed = false;
          errormessage += " Password,";
        }
        if (email === "" || email === null) {
          isproceed = false;
          errormessage += "  Email";
        }
    
        if (!isproceed) {
          toast.warning(errormessage);
        } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
          isproceed = false;
          toast.warning("Please enter a valid email!");
        }else if(!password==repassword){
            isproceed = false;
            toast.warning("Confirm password is wrong");
        }
        return isproceed;
      };

      const checkUser = async () => {
        try {
          const { data } = await axios.get(USER_API_BUILD);
          const signedInUser = data.filter((user) => user.id == email);
          if (signedInUser.length > 0 ) {
            setAlreadyUser(true);
          } else {
            setAlreadyUser(false);
          }
        } catch (error) {
            toast.error(error.message);
        }
      };
      useEffect(() => {
        checkUser();
      }, [email]);

      const addUser = async () => {
        try {
          await axios.post(USER_API_BUILD, user);
        } catch (error) {
            toast.error(error.message);
        }
      };

      const submitHandler = (e) => {

        e.preventDefault();
        if (IsValidate()) {
          if (alreadyUser) {
            toast.error("User already exists!.please signin!");
          } else {

            addUser();
            toast.success("logged in");
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
            setUser({
                name: "",
                password: "",
                email: "",
                id: "",
            });
            setRepassword('')
          }
        }
    
      };

  return (
    <section className="h-screen w-full flex items-center justify-center bg-white gap-x-8 dark:bg-[#303030]">

    <div className="absolute container max-w-[430px] w-full p-8 rounded-lg bg-[#f8f9fa] mx-4 xs:py-5 xs:px-2.5 shadow-[0_0.5rem_1rem_rgba(0,0,0,.15)] signup dark:bg-[#424242]">
        <div className=" p-4">
            <div className='flex items-center justify-center mt-5'>
                <div className='rounded-[50%] bg-[#007bff] w-20 h-20 flex items-center justify-center '>
                    <img src={userWhite} alt="" className='w-10 h-10' />
                </div>
            </div>
            
            <header className='text-3xl font-semibold text-center text-[#232836] mt-5 dark:text-white'>Signup</header>
            <form className='mt-8' action="#">
                <div className="relative h-12 w-full mt-5 rounded-md bg-white ">
                    <img src={user1} alt="" className=' w-4 h-4 absolute top-4 left-1.5' />
                    <input id='name' name='name' value={name} type="text" onChange={handleChange} placeholder="Name" className="pl-6 w-full h-full text-base rounded-md outline-none px-4 border border-[#CACACA] focus:border-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#303030] dark:text-white"/>
                </div>
                <div className="relative h-12 w-full mt-5 rounded-md bg-white ">
                    <img src={email1} alt="" className=' w-4 h-4 absolute top-4 left-1.5' />
                    <input id='email' name='email' value={email} onChange={handleChange} type="email" placeholder="Email" className="pl-6 w-full h-full text-base rounded-md outline-none px-4 border border-[#CACACA] focus:border-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#303030] dark:text-white"/>
                </div>
                <div className="relative h-12 w-full mt-5 rounded-md bg-white ">
                    <img src={password1} alt="" className=' w-4 h-4 absolute top-4 left-1.5' />

                    <input id='password' name='password' value={password} onChange={handleChange} type={showPassword ? "text" : "password" } placeholder="Confirm password" className="pl-6 w-full h-full text-base rounded-md outline-none px-4 border border-[#CACACA] focus:border-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#303030] dark:text-white"/>
                    <div onClick={showPassHandler} title='show password'> 
                        <img src={eye1} alt="" className={clsx('w-6 h-6 absolute top-3 right-2 cursor-pointer p-1 hover:brightness-75',showPassword?'block':'hidden')} />
                        <img src={eye3} alt="" className={clsx('w-6 h-6 absolute top-3 right-2 cursor-pointer p-1 hover:brightness-75',!showPassword?'block':'hidden')}/>    
                    </div> 
                </div>
                <div className="relative h-12 w-full mt-5 rounded-md bg-white group">
                    <img src={password2} alt="" className=' w-4 h-4 absolute top-4 left-1.5' />
                    <input id='repassword' name='repassword' value={repassword} onChange={handleRepassword} type={showPassword ? "text" : "password" } placeholder="Confirm password" className="pl-6 w-full h-full text-base rounded-md outline-none px-4 border border-[#CACACA] focus:border-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#303030] dark:text-white"/>
                    <div onClick={showPassHandler} title='show password'> 
                        <img src={eye1} alt="" className={clsx('w-6 h-6 absolute top-3 right-2 cursor-pointer p-1',showPassword?'block':'hidden')} />
                        <img src={eye3} alt="" className={clsx('w-6 h-6 absolute top-3 right-2 cursor-pointer p-1',!showPassword?'block':'hidden')}/>    
                    </div>    
                </div>

                <div className="relative h-12 w-full mt-5 rounded-md button-field">
                    <button onClick={submitHandler} className='h-full w-full text-base rounded-md text-white bg-[#007bff] transition-all hover:bg-[#016dcb]'>Signup</button>
                </div>
            </form>
            <div className="mt-3 text-center text-[#232836] text-sm dark:text-white">
                <span>Already have an account? <Link to="/login" className="text-[#007bff] no-underline hover:underline link signup-link">Login</Link></span>
            </div>
        </div>
        
    </div>
    <ToastContainer position="top-right" />
    </section>
  )
}

export default SignUp