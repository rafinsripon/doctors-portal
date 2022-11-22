import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

//Auth Contexts
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user ,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Goole Auth Provider
    const googleProvider = new GoogleAuthProvider();

    //Create USer
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //Log In
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //upadate user profile
    const updateUseProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    //sign with google
    const signWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }


    //Sign Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    //on auth state chage
    useEffect( () => {
      const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
            console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    },[])

    const authInfo = {
        user,
        createUser,
        signIn,
        updateUseProfile,
        signWithGoogle,
        loading,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;