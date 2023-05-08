import React, { createContext, useEffect, useState} from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../Firebase/Firebase.config' 





export const AuthContext = createContext();
const auth = getAuth(app)


const AuthProvider = ({children}) => {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)


    //register email password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //user width google
    const googleSignIn = () =>{
        setLoading(true);
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    
    }



    //sign in userId password
    const signInUserPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    //user update profile
    
    const updateUserProfile = (profile) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, profile)
                
    }

     //sign Out 
     const signOutUser = () => {
        setLoading(false);
        localStorage.removeItem('genius-token');
        return signOut(auth)
    
    }








    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false)
        });
        return () =>{
            return unsubscribe();
        }
    }, []);

    const authInfo = {
        user,
        createUser,
        googleSignIn,
        signInUserPassword,
        updateUserProfile,
        signOutUser,
        loading,
    }
    return (
        <AuthContext.Provider value={authInfo }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;