import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

// create context 
// onno jaiga babohar korte parbo props hisebe
export const AuthContext = createContext(null);

// firebase auth
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    // user login ache kina check korar jonno
    const [user, setUser] = useState(null);

    // reload dile harai jai, loading state
    const [loading, setLoading] = useState(true);

    // f ==> Onno jaiga theke email, password anbe auth er sathe call korbe
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in system
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Log out system
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    // user ke objerve korar jonno
    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user in auth state changed', currentUser)
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe
        }
    }, [])

    // Sob jaiga theke use korar jonno
    const authInfo = {
        user,
        loading,
        createUser,
        logOut,
        signIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;