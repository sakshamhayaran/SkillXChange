import Logo from '../assets/SkillXChange_logo.png';

function Contact() {
  return (
    <div id="contact" className="w-full bg-slate-950 p-10 md:p-20"> 

        <div className="grid mx-auto gap-5 grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className='w-20 h-20'>
                <img src={Logo} className='object-cover w-full h-full'></img>
            </div>
            
            <ul className="md:text-sm text-xs text-gray-400">
              <li>Building stronger communities through skill sharing and meaningful connections.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-bold text-gray-200 md:text-md text-sm">Contact</h1>
            <ul className="md:text-sm text-xs text-gray-400 flex gap-5">
              <li className="w-9 h-9 bg-slate-800 font-bold rounded-full flex items-center justify-center text-gray-500 text-sm hover:bg-slate-700 cursor-pointer">f</li>
              <li className="w-9 h-9 bg-slate-800 font-bold rounded-full flex items-center justify-center text-gray-500 text-sm hover:bg-slate-700 cursor-pointer">X</li>
              <li className="w-9 h-9 bg-slate-800 font-bold rounded-full flex items-center justify-center text-gray-500 text-sm hover:bg-slate-700 cursor-pointer">in</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-bold text-gray-200 md:text-md text-sm">Platform</h1>
            <ul className="md:text-sm text-xs text-gray-400">
              <li>How it works</li>
              <li>Safety Guidelines</li>
              <li>Community Rules</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-bold text-gray-200 md:text-md text-sm">Support</h1>
            <ul className="md:text-sm text-xs text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Report Issue</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-20 md:text-md text-sm text-center text-gray-400 border-t-[1px] border-slate-500">© 2025 SkillXChange. Made with ❤️ for building stronger communities.</div>
      </div>
  )
}

export default Contact