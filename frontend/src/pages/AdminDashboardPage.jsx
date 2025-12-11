import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminVehicleManagement from '../components/AdminVehicleManagement';
import AdminApplicationManagement from '../components/AdminApplicationManagement';
import api from '../api/api';

const AdminDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('vehicles');
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('validator/auth/logout');
            logout();
            navigate('/validator/login');
        } catch (error) {
            console.error('Logout error:', error);
            logout();
            navigate('/validator/login');
        }
    };

    return (
        <div>
            <header className="jumbotron bg-primary text-white">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="display-4">Admin Dashboard</h1>
                            <p className="lead">Selamat datang, {user?.name}</p>
                        </div>
                        <button className="btn btn-light" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mt-4">
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'vehicles' ? 'active' : ''}`}
                            onClick={() => setActiveTab('vehicles')}
                        >
                            Manajemen Kendaraan
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('applications')}
                        >
                            Ajuan Cicilan
                        </button>
                    </li>
                </ul>

                <div className="tab-content">
                    {activeTab === 'vehicles' && <AdminVehicleManagement />}
                    {activeTab === 'applications' && <AdminApplicationManagement />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
