import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Perbaikan: gunakan endpoint logout yang spesifik sesuai peran
            const logoutEndpoint = user.role === 'validator' ? 'validator/auth/logout' : 'auth/logout';
            await api.post(logoutEndpoint);
            logout();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
            // Tetap lakukan logout lokal meskipun API error
            logout();
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
            <div className="container">
                <a className="navbar-brand" href="#">Installment Cars</a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarsExampleDefault" 
                    aria-controls="navbarsExampleDefault" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav ml-auto">
                        {user && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard">
                                        {user.name || user.email} 
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="nav-link btn btn-link" 
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;