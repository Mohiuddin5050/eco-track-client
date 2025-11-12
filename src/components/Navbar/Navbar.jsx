import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log(user);
    const handleLogout = () => {
        logOut()
            .then(() => console.log("Logged out"))
            .catch((error) => console.error(error));
    }
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/challenges"
                    className={({ isActive }) =>
                        isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
                    }
                >
                    Challenges
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/activities"
                    className={({ isActive }) =>
                        isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
                    }
                >
                    My Activities
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/addChallenge"
                    className={({ isActive }) =>
                        isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
                    }
                >
                    Add Challenge
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="bg-white shadow-md sticky top-0 z-50">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <Link to="/" className="text-2xl font-bold text-purple-600">
                        🌿 EcoTrack
                    </Link>
                </div>

                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal gap-4 px-1">{navLinks}</ul>
                </div>

                <div className="navbar-end">
                    <div>
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost">
                                    <img
                                        src={user.photoURL}
                                        referrerPolicy='no-referrer'
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="ml-2">{user.displayName}</span>
                                </label>

                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/activities">My Activities</Link></li>
                                    <li>
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="space-x-3">
                                <a href="/login" className="btn btn-primary">Login</a>
                                <a href="/register" className="btn btn-secondary">Register</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="md:hidden bg-white border-t">
                <ul className="flex justify-center gap-4 py-2">{navLinks}</ul>
            </div>
        </div>
    );
};


export default Navbar;