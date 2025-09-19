
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import React, { createContext, useEffect, useState } from 'react';

export const authcontext=createContext();
const Authprovider = ({children}) => {
    const [user,setuser]=useState(null)
    const [loader,setloader]=useState(true)
    const googleprovider = new GoogleAuthProvider();

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
           setloader(false)
        })
        return ()=>unsubscribe();
    },[])
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