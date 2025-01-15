import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const url = process.env.REACT_APP_BASE_URL + "users/login";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, formData);
            setMessage(response.data.message);
            localStorage.setItem("token", response?.data?.token)
        } catch (error) {
            setMessage(error.response?.data?.message || "Error occurred");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
            {message && <p className="text-center mt-3">{message}</p>}
        </div>
    );
};

export default Login;
