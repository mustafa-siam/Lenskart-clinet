import React, { useContext } from "react";
import { authcontext } from "../Providers/Authprovider";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const UserProfile = () => {
  const { user } = useContext(authcontext);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 mt-10 text-center">
      <img
        src={user?.photoURL || "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"}
        alt="User Avatar"
        onError={(e) => (e.target.src = "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png")}
        className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-200 object-cover"
      />
      <h2 className="text-2xl font-semibold mt-4">{user?.displayName || "User Name"}</h2>
      <p className="text-gray-500 text-sm">{user?.email}</p>
      <p className="text-gray-600 mt-3">
        Role: <span className="font-medium">{user?.role || "User"}</span>
      </p>

      <div className="mt-6">
        <Link
          to="/dashboard/updateProfile"
          className="btn bg-indigo-600 text-white px-6 hover:bg-indigo-700"
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
