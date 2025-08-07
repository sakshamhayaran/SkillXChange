import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Button from "../components/Button";
import Logo from '../assets/SkillXChange_logo.png';

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full flex sticky bg-white top-0 z-50 flex-col">
      <div className="w-full md:shadow-md flex items-center justify-between px-6 py-2">
        <div className='w-20 h-20'>
          <img src={Logo} className='object-cover w-full h-full'></img>
        </div>
        <div>
          <FontAwesomeIcon icon={faBars} className="flex md:hidden text-gray-800 text-2xl" 
          onClick={()=>setIsMenuOpen(prev => !prev)}/>
        <ul className="hidden md:flex gap-5 justify-center items-center">
          <li className='hover:scale-110 transition-transform duration-500'><a href="#features" className="hover:text-gray-500">Features</a></li>
          <li className='hover:scale-110 transition-transform duration-500'><a href="#skills" className="hover:text-gray-500">Skills</a></li>
          <li className='hover:scale-110 transition-transform duration-500'><a href="#testimonials" className="hover:text-gray-500">Testimonials</a></li>
          <li className='hover:scale-110 transition-transform duration-500'><a href="#contact" className="hover:text-gray-500">Contact</a></li>
        </ul>
        </div>
        <a href="#hero">
          <Button text="Join Now" bgcolor="bg-indigo-800" textcolor="text-white" classes='text-sm hover:opacity-70 hover:scale-105 transition-transform duration-500' />
        </a>
      </div>

      {isMenuOpen ? <div className="w-full flex shadow-md md:hidden p-6">
        <ul className="w-full flex flex-col gap-5 justify-center items-center transition-all duration-300 ease-in-out">
          <li className='hover:scale-110 transition-transform duration-500'><a href="#features" className="hover:text-gray-500" onClick={()=>setIsMenuOpen(prev => !prev)}>Features</a></li>
          <li className='hover:scale-110 transition-transform duration-500'><a href="#skills" className="hover:text-gray-500" onClick={()=>setIsMenuOpen(prev => !prev)}>Skills</a></li>
          <li className='hover:scale-110 transition-transform duration-500'><a href="#testimonials" className="hover:text-gray-500" onClick={()=>setIsMenuOpen(prev => !prev)}>Testimonials</a></li>
          <li className='hover:scale-110 transition-transform duration-500'><a href="#contact" className="hover:text-gray-500" onClick={()=>setIsMenuOpen(prev => !prev)}>Contact</a></li>
        </ul>
      </div> : null}
      </nav>
  )
}

export default Navbar