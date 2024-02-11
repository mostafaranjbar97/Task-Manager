import React from 'react'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import signin from '../assets/signin.png'
import signout from '../assets/signout.png'
import ThemeSwitcher from './ThemeSwitcher'

function Header() {
    const getUser= localStorage.getItem("user")
    const currentUser = getUser && JSON.parse(getUser)
    const navigate = useNavigate();
    const logoutHandler=()=>{
        localStorage.removeItem("user")
        navigate('/login')
    }

  return (
    <header className='bg-[rgba(0,123,255,0.7)]  flex justify-between items-center px-4 dark:bg-[rgb(0,123,255)] lg:py-2 shadow-md dark:shadow-md'>
        <Link to="/" className=' py-1' title='Home'>
            <img src={logo} alt="" className='h-12 w-auto' />
        </Link>
        {getUser && <p className='text-xl font-bold  text-white lg:text-2xl hidden sm:inline-block'>{currentUser.name}`s Todo</p>}
        <div className='flex'>
            <ThemeSwitcher/>
            {getUser ? 

            <div className='flex cursor-pointer hover:text-blue-100 items-center justify-center border border-white p-1 rounded hover:bg-[#007bff] dark:hover:bg-[#0055ff]'>
                <img src={signout} alt="" className='h-6 w-auto px-1' />
                <p onClick={logoutHandler} className=' text-white '>logout</p>
            </div> : 
            <Link to='/login' className=' cursor-pointer border border-white p-1 rounded hover:text-blue-100 hover:bg-[#007bff] dark:hover:bg-[#0055ff] '>
                <div className=' text-white flex items-center justify-center'>
                    <img src={signin} alt="" className='h-6 w-auto px-1' />
                    <p>Signin | Signup</p>    
                </div>
            </Link>}
        
        </div>
        

    </header>
  )
}

export default Header