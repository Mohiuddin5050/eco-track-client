import React, { use, useState } from 'react';
import { AuthContext } from '../provider/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

const Register = () => {
    const { googleLogin, createUser, updateUserProfile, setUser } = use(AuthContext);

  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    // Password Validation
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const special = /[@#$%^&*()_+!]/;

    if (!uppercase.test(password)) {
      setPassError("Password must have at least 1 uppercase letter.");
      setLoading(false);
      return;
    }
    if (!lowercase.test(password)) {
      setPassError("Password must have at least 1 lowercase letter.");
      setLoading(false);
      return;
    }
    if (!special.test(password)) {
      setPassError("Password must have at least 1 special character.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setPassError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    setPassError("");

    try {
       await createUser(email, password);

      await updateUserProfile({
        displayName: name,
        photoURL: photo,
      });
      setUser({displayName: name,
        photoURL: photo,})
      toast.success("Registration successful");
      navigate(redirectPath);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google Registration successful");
      navigate(redirectPath);
    } catch (err) {
      toast.error(err.message);
    }
}
    return (
        <div className="max-w-md mx-auto mt-12 p-8 shadow-lg rounded-xl bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
        Join EcoTrack
      </h2>

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="font-medium">Name</label>
          <input name="name" type="text" required className="input input-bordered w-full" />
        </div>

        <div className="mb-3">
          <label className="font-medium">Email</label>
          <input name="email" type="email" required className="input input-bordered w-full" />
        </div>

        <div className="mb-3">
          <label className="font-medium">Photo URL</label>
          <input name="photo" type="text" required className="input input-bordered w-full" />
        </div>

        <div className="mb-3">
          <label className="font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            className="input input-bordered w-full"
          />
          {passError && <p className="text-red-500 text-sm mt-1">{passError}</p>}
        </div>

        <button
          disabled={loading}
          className="btn btn-primary w-full mt-3"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <button onClick={handleGoogle} className="btn btn-outline w-full mt-4">
        Continue with Google
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-600 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
    
};

export default Register;