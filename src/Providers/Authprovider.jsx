
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import React, { createContext, useEffect, useState } from 'react';
import useAxiossecure from '../Hooks/useAxiossecure';
import axios from 'axios';

export const authcontext=createContext();
const Authprovider = ({children}) => {
    const [user,setuser]=useState(null)
    const [loader,setloader]=useState(true)
    const googleprovider = new GoogleAuthProvider();
    const axiosSecure=useAxiossecure();
    const creatuser=(email,password)=>{
        setloader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login=(email,password)=>{
        setloader(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentuser)=>{
           setuser(currentuser)
           if(currentuser?.email){
       axios.post('http://localhost:5000/jwt', { email: currentuser.email }, { withCredentials: true })
       .then(res=>console.log('jwt set',res.data))
       .catch(err=>console.error("jwt error",err))
       .finally(()=>setloader(false))
           }
        else{
            axiosSecure.post("/logout",{})
            .then(res=>console.log("jwt cleared",res.data))
            .catch(err=>console.error("logout error",err))
            .finally(()=>setloader(false))
        }
        })
        return ()=>unsubscribe();
    },[axiosSecure])
    const updateprofile=(name,photo)=>{
      return updateProfile(auth.currentUser,{
        displayName: name, 
        photoURL: photo
      })
    }
    const googlelogin=()=>{
        setloader(true);
        return signInWithPopup(auth,googleprovider)
    }
    const logout=()=>{
        setloader(true)
        return signOut(auth)
    }
    const authinfo={
       creatuser,
       login,
       updateprofile,
       logout,
       googlelogin,
       user,
       loader,
    }
    return (
        <authcontext.Provider value={authinfo}>
             {children}
        </authcontext.Provider>
    );
};

export default Authprovider;