import React, { useState, useEffect } from 'react';
import '../styles/AuthRegistration.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../store/action/auth.action';
import { useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { clearMessage } from '../store/slice/auth.slice'


export default function AuthRegistration() {
    const { successMessage, errorMessage, loading } = useSelector(state => state.auth);
    const [form, setForm] = useState({ name: 'Naeem Akhter', email: 'dreamabroad83@gmail.com', password: 'Naeem@1234', confirm: 'Naeem@1234' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: false }))
        setForm((s) => ({ ...s, [name]: value }));
    };


    const validate = () => {
        const err = {};
        if (!form.name.trim()) err.name = 'Name is required';
        if (!form.email.trim()) err.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email';
        if (!form.password) err.password = 'Password is required';
        else if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
        if (!form.confirm) err.confirm = 'Please confirm your password';
        else if (form.password !== form.confirm) err.confirm = 'Passwords do not match';
        return err;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const v = validate();
        console.log("first")
        setErrors(v);
        dispatch(createUser(form))
        // if (Object.keys(v).length === 0) {

        // } else {
        //     setSubmitted(false);
        // }
    };


    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage, {
                position: "top-right",
                autoClose: 3000,
            });

            setSubmitted(true);
            setForm({ name: '', email: '', password: '', confirm: '' });
        }

        if (errorMessage) {
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
            });
            setSubmitted(false);
        }
        dispatch(clearMessage())
    }, [successMessage, errorMessage]);

    return (
        <div className="auth-wrapper">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <h2 className="form-title">Create an account</h2>

                <label className="form-label">
                    Name
                    <input
                        className={`form-input ${errors.name ? 'invalid' : ''}`}
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </label>

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
                        placeholder="At least 6 characters"
                        required
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </label>

                <label className="form-label">
                    Confirm Password
                    <input
                        className={`form-input ${errors.confirm ? 'invalid' : ''}`}
                        name="confirm"
                        type="password"
                        value={form.confirm}
                        onChange={handleChange}
                        placeholder="Repeat your password"
                        required
                    />
                    {errors.confirm && <div className="error">{errors.confirm}</div>}
                </label>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <p>Already have account ?</p>
                    <Link style={{
                        textDecoration: 'none'
                    }} to={'/'}>Click here</Link>
                </div>
                <button type="submit" disabled={loading} className="submit-btn">{loading ? "Wait..." : "Register"}</button>

                {submitted && <div className="success">Registration successful (demo)</div>}

            </form>
        </div>
    );
}

