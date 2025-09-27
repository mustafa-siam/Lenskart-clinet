import { authcontext } from '../Providers/Authprovider';
import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom';
const SocialLogin = () => {
  const {googlelogin}=useContext(authcontext)
  const location=useLocation()
  const navigate=useNavigate()
  const from=location.state?.from || '/'
  const handlegoogle=()=>{
     googlelogin()
     .then((result)=>{
      console.log(result.user)
      navigate(from)
     }
     )
  }
    return (
        <div>
             <div className='flex justify-center items-center'>
<button onClick={handlegoogle} className="btn gap-3 w-full bg-white text-black border-[#e5e5e5] hover:bg-[#dadee7]">
  <FcGoogle className='text-2xl'/>
  Login with Google
</button>
             </div>
        </div>
    );
};

export default SocialLogin;