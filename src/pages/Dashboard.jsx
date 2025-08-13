import Button from "../components/Button";
import { useState } from "react";
import Logo from '../assets/SkillXChange_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link , Outlet } from "react-router-dom";

export default function Dashboard() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <nav className="w-full flex sticky bg-indigo-800 top-0 z-50 flex-col">
      <div className="w-full md:shadow-md flex items-center justify-between px-6 py-2">
        <div className='w-20 h-20'>
          <img src={Logo} className='object-cover w-full h-full'></img>
        </div>
        <div>
          <FontAwesomeIcon icon={faBars} className="flex md:hidden text-white text-2xl" 
          onClick={()=>setIsMenuOpen(prev => !prev)}/>
        <ul className="hidden md:flex gap-5 text-white justify-center items-center">
          <Link to="/dashboard/home" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300'>Home</Link>
          <Link to="" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300'>Requests</Link>
          <Link to="" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300'>Notifications</Link>
          <Link to="/dashboard/profile" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300'>Profile</Link>
        </ul>
        </div>
        <a href="#hero">
          <Button text="Logout" bgcolor="bg-white" textcolor="text-indigo-800" classes='text-sm hover:opacity-70 hover:scale-105 transition-transform duration-500' />
        </a>
      </div>

      {isMenuOpen ? <div className="w-full flex text-white shadow-md md:hidden p-6">
        <ul className="w-full flex flex-col gap-5 justify-center items-center transition-all duration-300 ease-in-out">
          <Link to="/dashboard/home" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300' onClick={()=>setIsMenuOpen(prev => !prev)}>Home</Link>
          <Link to="" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300' onClick={()=>setIsMenuOpen(prev => !prev)}>Requests</Link>
          <Link to="" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300' onClick={()=>setIsMenuOpen(prev => !prev)}>Notifications</Link>
          <Link to="/dashboard/profile" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300' onClick={()=>setIsMenuOpen(prev => !prev)}>Profile</Link>
        </ul>
      </div> : null}
      </nav>

      <div><Outlet /></div>
      </>
  )
}
