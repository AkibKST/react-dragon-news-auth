import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {

    // Context theke signIn ta nilam
    const {signIn} = useContext(AuthContext);

    // PATH location
    const location = useLocation();

    // navigate
    const navigate = useNavigate()

    // Log in Button function
    const handleLogin = (e) =>{
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);

        // Get Email
        const email = form.get('email');

        // Get Password
        const password = form.get('password');
        console.log(email,password);

        // sign in
        signIn(email,password)
        .then(result =>{
            console.log(result)

            // navigate after login
            navigate(location?.state ? location.state : '/')
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h2 className="text-3xl my-10 text-center">Please Login</h2>
                <form onSubmit={handleLogin} className="md:w-3/4 lg:w-1/2 mx-auto mb-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" required name="email" placeholder="email" className="input input-bordered"/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className="mx-auto text-center">
                    Do not have an account? <Link to="/register" className="text-blue-600 font-bold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;