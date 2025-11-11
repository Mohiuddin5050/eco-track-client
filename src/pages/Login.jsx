import React, { use, useState } from 'react';
import { AuthContext } from '../provider/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
    const { login, googleLogin, setUser } = use(AuthContext);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        login(email, password)
            .then(() => {
                toast.success("Login successful!");
                navigate(from, { replace: true });
            })
            .catch((err) => toast.error(err.message));
    };

    const handleGoogle = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;
                setUser(user)
                toast.success(`Welcome, ${user.displayName}!`);
                navigate("/");
            })
            .catch((err) => toast.error(err.message));
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h2 className='text-center font-semibold text-2xl pb-5'>Login your account</h2>
                <form onSubmit={handleLogin} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input name='email' type="email" className="input" placeholder="Email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />


                        <label className="label">Password</label>
                        <input name='password' type="password" className="input" placeholder="Password" required />

                        <p className="text-sm text-purple-600 mt-1">
                            <Link to="/forget-password" state={{ email }}>
                                Forget Password?
                            </Link>
                        </p>

                        <button type='submit' className="btn btn-neutral mt-4">Login</button>
                        <button type="button"
                            onClick={handleGoogle}
                            className="btn btn-outline mt-3 w-full">
                            Login with Google
                        </button>
                        <p className='text-center text-accent py-5'>Don’t Have An Account ? <Link className='text-secondary' to='/register'>Register</Link></p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;