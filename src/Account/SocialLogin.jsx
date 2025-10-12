import moment from 'moment';
import usePubliceAxios from '../Hooks/usePubliceAxios';
import { authcontext } from '../Providers/Authprovider';
import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom';
const SocialLogin = () => {
  const {googlelogin}=useContext(authcontext)
  const axiospublic=usePubliceAxios()
  const location=useLocation()
  const navigate=useNavigate()
  const from=location.state?.from || '/'
  const handlegoogle=()=>{
     googlelogin()
     .then(async(result)=>{
      console.log(result.user)
      const userinfo={
            name:result.user?.displayName,
            email:result.user?.email,
            createdAt:moment().format("DD-MM-YYYY"),
            role:"user"
        }
     const res= await axiospublic.post('users', userinfo);
      if(res.data.insertedId){
document.getElementById('automodal').close();        
          navigate(from);
      }  
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
      });
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