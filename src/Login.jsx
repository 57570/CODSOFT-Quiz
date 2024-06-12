import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './authContext.js';
import './Login.css'
const Login = () => {
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const res_login = await axios.post('http://localhost:8080/login', { email, password });
            if (res_login.data.message === "Successfully login") {
                setAuth({
                    isAuthenticated: true,
                    user: res_login.data.user
                });

                localStorage.setItem('auth', JSON.stringify(res_login.data));

                // Redirect back to the intended page after successful login
                const intendedPath = localStorage.getItem('intendedPath') || '/';
                localStorage.removeItem('intendedPath');
                navigate(intendedPath);
            } else {
                alert(res_login.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Error while login");
        }
    };

    return (
        <>
            <div className='login-container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmitLogin}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            id="exampleInputEmail1"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className='form-group'>
                        <button type="button" onClick={() => navigate("/forgotpassword")} className="btn btn-link forgot-password">
                            Forgot password ?
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login;