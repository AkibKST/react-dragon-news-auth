import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

// create context 
// onno jaiga babohar korte parbo props hisebe
export const AuthContext = createContext(null);

// firebase auth
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    // user login ache kina check korar jonno
    const [user, setUser] = useState(null);

    // f ==> Onno jaiga theke email, password anbe auth er sathe call korbe
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sob jaiga theke use korar jonno
    const authInfo = {
        user,
        createUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;