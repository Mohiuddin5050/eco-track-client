import { useState } from "react";
import app from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";



const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);

    const googleLogin = () => {
    return signInWithPopup(auth, googleProvider)
  };

   const logOut = () => {
    return signOut(auth);
  };

    


    const authInfo={
        user,
        setUser,
        googleLogin,
        logOut
    }
    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;