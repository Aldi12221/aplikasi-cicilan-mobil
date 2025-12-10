import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const ValidatorLoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('validator/auth/login', formData);
            // Tambahkan peran validator secara eksplisit ke objek pengguna
            const userWithRole = { ...response.data.validator, role: 'validator' };
            login(userWithRole, response.data.token);
            navigate('/validator/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            console.error(err);
        }
    };

    return (
        <main>
            <header className="jumbotron">
                <div className="container text-center">
                    <h1 className="display-4">Validator Dashboard</h1>
                </div>
            </header>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card card-default" onSubmit={handleSubmit}>
                            <div className="card-header">
                                <h4 className="mb-0">Login Validator</h4>
                            </div>
                            <div className="card-body">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">Email</div>
                                    <div className="col-8">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row align-items-center mt-3">
                                    <div className="col-4 text-right">Password</div>
                                    <div className="col-8">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row align-items-center mt-4">
                                    <div className="col-4"></div>
                                    <div className="col-8">
                                        <button className="btn btn-primary" type="submit">Login</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <p>Bukan validator? <Link to="/login">Login sebagai Masyarakat</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ValidatorLoginPage;