import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();  // Initialize navigate
    const url = process.env.REACT_APP_BASE_URL + "users/register";
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, formData);
            setMessage(response.data.message);
            if (response.status === 201) {
                navigate("/login");  // Redirect to login page
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Error occurred");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <input type="text" name="role" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            {message && <p className="text-center mt-3">{message}</p>}
        </div>
    );
};

export default Register;
