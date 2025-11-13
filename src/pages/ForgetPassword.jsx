import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebase/firebase.config";

const ForgetPassword = () => {
  const auth = getAuth(app);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent! Redirecting to Gmail...", {
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.href = "https://mail.google.com";
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="flex justify-center items-center h-[80vh] bg-base-200">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleResetPassword}>
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="btn bg-purple-600 hover:bg-purple-700 text-white w-full"
          >
            Reset Password
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="text-sm text-purple-600 text-center mt-4 cursor-pointer hover:underline"
        >
          Back to Login
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
