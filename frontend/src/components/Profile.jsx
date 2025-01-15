import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const fetchProfile = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(response.data);
        } catch (error) {
            setError(error.response?.data?.message || "Error fetching profile");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">User Profile</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <button className="btn btn-primary" onClick={fetchProfile}>Fetch Profile</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {profile && (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Name: {profile.name}</h5>
                        <p className="card-text">Email: {profile.email}</p>
                        <p className="card-text">Role: {profile.role}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
