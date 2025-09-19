import React from 'react';
import { FcGoogle } from "react-icons/fc";
const SocialLogin = () => {
    return (
        <div>
             <div className='flex justify-center items-center'>
<button className="btn gap-3 w-full bg-white text-black border-[#e5e5e5] hover:bg-[#dadee7]">
  <FcGoogle className='text-2xl'/>
  Login with Google
</button>
             </div>
        </div>
    );
};

export default SocialLogin;