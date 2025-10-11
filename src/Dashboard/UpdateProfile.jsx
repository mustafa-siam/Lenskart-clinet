import React, { useContext, useState } from "react";
import { authcontext } from "../Providers/Authprovider";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateProfile = () => {
  const { user, updateprofile } = useContext(authcontext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

 const handleimgupload=async(e)=>{
    const image=e.target.files[0]
    const formData=new FormData();
    formData.append("image",image)
    const imgupdateurl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_api_key}`
    const res=await axios.post(imgupdateurl,formData)
    if(res.data.success){
        const uploadrul=res.data.data.display_url
        setPhotoURL(uploadrul)
    }
 }
  const handleUpdate = (e) => {
    e.preventDefault();

    updateprofile(name, photoURL)
      .then(() => {
        toast.success("Profile updated successfully!")
        
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update profile!")
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-fuchsia-700">
        Update Profile
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
             <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
            <input type="file" onChange={handleimgupload} className="file-input file-input-secondary w-full" />
        </div>

        <button
          type="submit"
          disabled={!photoURL}
          className="btn bg-fuchsia-600 text-white w-full hover:bg-fuchsia-700"
        
        >
            Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
