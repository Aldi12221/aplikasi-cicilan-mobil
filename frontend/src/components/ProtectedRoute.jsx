import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { token, user } = useContext(AuthContext);

    // Debug: log user and role
    console.log('ProtectedRoute - User:', user);
    console.log('ProtectedRoute - User Role:', user?.role);
    console.log('ProtectedRoute - Allowed Role:', allowedRole);

    if (!token) {
        return <Navigate to="/login" />;
    }


    if (allowedRole && user && user.role !== allowedRole) {
        console.log('Role mismatch, redirecting...');
        if (user.role === 'validator') {
            return <Navigate to="/validator/dashboard" />;
        } else if (user.role === 'company' || user.role === 'admin') {
            return <Navigate to="/admin/dashboard" />;
        }
        return <Navigate to="/dashboard" />;
    }


    return children;
};

export default ProtectedRoute;