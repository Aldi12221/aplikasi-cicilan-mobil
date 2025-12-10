import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { token, user } = useContext(AuthContext);

    
    if (!token) {
        return <Navigate to="/login" />;
    }

   
    if (allowedRole && user && user.role !== allowedRole) {
        if (user.role === 'validator') {
            return <Navigate to="/validator/dashboard" />;
        }
        return <Navigate to="/dashboard" />;
    }

    
    return children;
};

export default ProtectedRoute;