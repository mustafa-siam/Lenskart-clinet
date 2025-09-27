import React, { useContext} from 'react';
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form"
import { authcontext } from '../Providers/Authprovider';
import { toast } from 'react-toastify';
import {useLocation, useNavigate } from 'react-router-dom';
const Login = ({onswitch}) => {
    const {login}=useContext(authcontext)
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const location=useLocation()
const navigate=useNavigate()
const from=location.state?.from || '/'
  const onSubmit = (data) =>{
const email=data.email;
const password=data.password;
login(email,password)
.then(result=>{
    console.log(result.user)
    toast.success('Login successfull')
    setTimeout(() => {
         document.getElementById('automodal').close()
         navigate(from);
    }, 2000); 
})
.catch(error=>{
    console.error(error.message)
    toast.error(`${error.message}`)
})
  } 
    return (
        <div className='flex justify-center items-center w-full'>
             <fieldset className="fieldset rounded-box w-xs  p-4">
    <div className="flex justify-between text-base font-bold">
  <legend className="fieldset-legend">Login to your account</legend>
  <legend className="fieldset-legend">Sign In</legend>
    </div>
  <form onSubmit={handleSubmit(onSubmit)} className="text-base space-y-2">
<label className="label">Email</label>
  <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
{errors.email && <span className="text-red-600 text-sm">This field is required</span>} <br />
  <label className="label">Password</label>
  <input type="password" {...register("password", { required: true })} className="input" placeholder="Password" />
{errors.password && <span className="text-red-600 text-sm">This field is required</span>}
  <input className="btn btn-neutral mt-4 w-full rounded-xl hover:opacity-70" type="submit" value={"Sign In"}/>
  </form>
  <div className="divider">OR</div>
  <SocialLogin></SocialLogin>
  <p className="text-base text-center font-medium pt-3 ">Don't have an account?<span className="cursor-pointer hover:border-b-2 text-primary" onClick={onswitch}>Sign Up</span></p>
</fieldset>
        </div>
    );
};

export default Login;