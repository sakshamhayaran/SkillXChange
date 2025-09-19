import Button from "../components/Button";
import { useState } from "react";
import Logo from '../assets/SkillXChange_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link , Outlet, useNavigate } from "react-router-dom";
import { auth } from '../Firebase/firebase'
import { signOut } from "firebase/auth";

export default function Dashboard() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    }
    catch(error) {
      alert("!! Error logging out !!");
      console.log("Error logging out : ",error);
    }
  }

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
          <Link to="/dashboard" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300'>Home</Link>
          <Link to="/dashboard/requests" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300'>Requests</Link>
          <Link to="/dashboard/messges" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300'>Messages</Link>
          <Link to="/dashboard/profile" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300'>Profile</Link>
        </ul>
        </div>
        
          <Button onClick={handleLogout} text="Logout" bgcolor="bg-white" textcolor="text-indigo-800" classes='text-sm hover:opacity-70 hover:scale-105 transition-transform duration-500' />
        
      </div>

      {isMenuOpen ? <div className="w-full flex text-white shadow-md md:hidden p-6">
        <ul className="w-full flex flex-col gap-5 justify-center items-center transition-all duration-300 ease-in-out">
          <Link to="/dashboard" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300' onClick={()=>setIsMenuOpen(prev => !prev)}>Home</Link>
          <Link to="/dashboard/requests" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300' onClick={()=>setIsMenuOpen(prev => !prev)}>Requests</Link>
          <Link to="/dashboard/messges" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300' onClick={()=>setIsMenuOpen(prev => !prev)}>Messages</Link>
          <Link to="/dashboard/profile" className='hover:scale-110 transition-transform duration-500 hover:text-gray-300' onClick={()=>setIsMenuOpen(prev => !prev)}>Profile</Link>
        </ul>
      </div> : null}
      </nav>

      <div><Outlet /></div>
      </>
  )
}
