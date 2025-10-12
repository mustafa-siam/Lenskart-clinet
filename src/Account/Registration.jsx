import { useContext } from "react";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form"
import { authcontext } from "../Providers/Authprovider";
import { toast } from "react-toastify";
import useAxiossecure from "../Hooks/useAxiossecure";
import moment from "moment";
const Registration = ({onswitch}) => {
  const {creatuser,updateprofile}=useContext(authcontext)
  const axiosecure=useAxiossecure()
const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = (data) =>{
console.log(data)
const name=data.name;
const email=data.email;
const password=data.password;
creatuser(email,password)

.then((result)=>{
  console.log(result.user)
 updateprofile(name)
 .then(async() => {
            const userinfo = {
              name: name,
              email: email,
              createdAt:moment().format("DD-MM-YYYY"),
              role:"user",
            }
 const res=await axiosecure.post('users',userinfo)
 if(res.data.insertedId){
toast.success("Account Created Successfully")
reset();
 }
  })
         document.getElementById('automodal').close()
})
.catch(error=>{
  console.error(error.message)
  toast.error(`${error.message}`)
})
  } 
  return (
  <fieldset className="fieldset rounded-box w-xs  p-4">
    <div className="flex justify-between text-base font-bold">
  <legend className="fieldset-legend">Creat your account</legend>
  <legend className="fieldset-legend">Sign Up</legend>
    </div>
  <form onSubmit={handleSubmit(onSubmit)} className="text-base space-y-2">
<label className="label">Name</label>
  <input type="text" {...register("name", { required: true })} className="input" placeholder="Enter Name" />
   {errors.name && <span className="text-red-600 text-sm">This field is required</span>}  <br />
<label className="label">Email</label>
  <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
{errors.email && <span className="text-red-600 text-sm">This field is required</span>} <br />
  <label className="label">Password</label>
  <input type="password" {...register("password", { required: true })} className="input" placeholder="Password" />
{errors.password && <span className="text-red-600 text-sm">This field is required</span>}
  <input className="btn btn-neutral mt-4 w-full rounded-xl hover:opacity-70" type="submit" value={"Sign Up"}/>
  </form>
  <div className="divider">OR</div>
  <SocialLogin></SocialLogin>
  <p className="text-base text-center font-medium pt-3 ">Already have an account?<span className="cursor-pointer hover:border-b-2 text-primary" onClick={onswitch}>Sign In</span></p>
</fieldset>
  );
};

export default Registration;
