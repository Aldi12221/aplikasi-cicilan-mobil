import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ValidationPage from './pages/ValidationPage';
import CarListPage from './pages/CarListPage';
import CarDetailPage from './pages/CarDetailPage';
import ValidatorDashboardPage from './pages/ValidatorDashboardPage';
import ValidatorLoginPage from './pages/ValidatorLoginPage';
import Layouts from './components/layouts'
import NotFound from './pages/NotFound';

function App() {
    return (
       
        <Routes  >
            {/* Rute publik */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/validator/login" element={<ValidatorLoginPage />} />
            
            {/* Rute yang hanya bisa diakses oleh masyarakat (society) */}
            <Route path='/' element={<Layouts></Layouts>}>
            <Route path="/dashboard" element={<ProtectedRoute allowedRole="society"><DashboardPage /></ProtectedRoute>} />
            <Route path="/validation/request" element={<ProtectedRoute allowedRole="society"><ValidationPage /></ProtectedRoute>} />
            <Route path="/instalment_cars" element={<ProtectedRoute allowedRole="society"><CarListPage /></ProtectedRoute>} />
            <Route path="/instalment_cars/:id" element={<ProtectedRoute allowedRole="society"><CarDetailPage /></ProtectedRoute>} />

            {/* Rute yang hanya bisa diakses oleh validator */}
            <Route path="/validator/dashboard" element={<ProtectedRoute allowedRole="validator"><ValidatorDashboardPage /></ProtectedRoute>} />
            </Route>

            {/* Rute default untuk halaman yang tidak ditemukan */}
            <Route path="*" element={<NotFound/>} />
        </Routes>
        
    );
}

export default App;