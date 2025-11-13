import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import { toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import useTitle from "../hooks/useTitle";

const Profile = () => {
  useTitle("Profile")
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const auth = getAuth();

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name.trim() || !photo.trim()) {
      toast.error("Please fill out all fields");
      return;
    }

    updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          My Profile
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={photo || "https://i.ibb.co/5GzXkwq/user.png"}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-purple-400 mb-3"
          />

          <h3 className="text-lg font-semibold">{name || "No Name"}</h3>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter photo URL"
            />
          </div>

          <button
            type="submit"
            className="btn bg-purple-600 hover:bg-purple-700 text-white w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
