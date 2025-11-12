import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      signIn(email, password).then((res) => console.log(res));
      toast.success("Login successful!");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google Login successful");
      navigate(redirectPath);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 shadow-lg rounded-xl bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
        Login to EcoTrack
      </h2>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-3">
          <label className="font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            className="input input-bordered w-full"
          />
        </div>

        <button disabled={loading} className="btn btn-primary w-full mt-3">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button onClick={handleGoogle} className="btn btn-outline w-full mt-4">
        Continue with Google
      </button>

      <p className="text-center mt-4">
        New to EcoTrack?
        <Link to="/register" className="text-purple-600 font-semibold ml-1">
          Register
        </Link>
      </p>

      <p className="text-center mt-2">
        <Link to="/forgot-password" className="text-sm text-gray-600 underline">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default Login;
