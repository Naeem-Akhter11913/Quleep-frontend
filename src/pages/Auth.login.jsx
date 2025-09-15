import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearMessage } from '../store/slice/auth.slice';
import { loginUser } from '../store/action/auth.action';
import '../styles/AuthLogin.css';

export default function AuthLogin() {
    const { successMessage, errorMessage, loading, user, accessToken } = useSelector(state => state.auth);


    const [form, setForm] = useState({ email: 'dreamabroad83@gmail.com', password: 'Naeem@1234' });
    
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (accessToken) {
            navigate('/dashboard');
        }
    }, [accessToken])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: false }))
        setForm((s) => ({ ...s, [name]: value }));
    };

    const validate = () => {
        const err = {};
        if (!form.email.trim()) err.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email';
        if (!form.password) err.password = 'Password is required';
        return err;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        dispatch(loginUser(form))
    };

    useEffect(() => {
        console.log(successMessage,errorMessage)
        if (successMessage) {
            toast.success(successMessage, {
                position: "top-right",
                autoClose: 3000,
            });

            setSubmitted(true);
            setForm({ email: '', password: '' });
        }

        if (errorMessage) {
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
            });
            setSubmitted(false);
        }
        dispatch(clearMessage());
    }, [successMessage, errorMessage]);



    return (
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <h2 className="form-title">Login</h2>

                <label className="form-label">
                    Email
                    <input
                        className={`form-input ${errors.email ? 'invalid' : ''}`}
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </label>

                <label className="form-label">
                    Password
                    <input
                        className={`form-input ${errors.password ? 'invalid' : ''}`}
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Your password"
                        required
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </label>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <p>Don't have account ?</p>
                    <Link style={{
                        textDecoration: 'none'
                    }} to={'/registration'}>Click here</Link>
                </div>
                <button type="submit" disabled={loading} className="submit-btn">{loading ? "Wait..." : "Login"}</button>

                {submitted && <div className="success">Login submitted (demo)</div>}
            </form>
        </div>
    );
}

/*
AuthLogin.css
Place this file next to AuthLogin.jsx and import it as shown above.
*/
