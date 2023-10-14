import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({children}) => {

    // context theke user ke nibo
    const {user, loading} = useContext(AuthContext);

    // PATH location
    const location = useLocation();
    // console.log(location)

    // loading hole snipper dekhabe
    if(loading){
        return <span className="loading loading-infinity loading-lg"></span>
    }

    // condition = jdi user thake continue, na thakle login e
    if(user){
        return children;
    }

    return (
        // current location er pathname ta state e set hocche
        <Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default PrivateRoute;