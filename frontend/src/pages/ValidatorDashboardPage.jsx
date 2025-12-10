import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api';

import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ValidatorDashboardPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [validations, setValidations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchValidations = async () => {
        try {
            const response = await api.get('validator/validations');
            setValidations(response.data.validations);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal mengambil data validasi');
            setLoading(false);
            console.error('Error fetching validations:', err);
        }
    };

    useEffect(() => {
        fetchValidations();
    }, []);

    const handleAccept = async (id) => {
        try {
            await api.post(`validator/validations/${id}/accept`);
            alert('Permintaan validasi berhasil diterima!');
            fetchValidations(); // Refresh daftar setelah aksi
        } catch (err) {
            alert('Gagal menerima permintaan validasi.');
            console.error(err);
        }
    };

    const handleReject = async (id) => {
        const notes = prompt('Masukkan alasan penolakan:');
        if (!notes || notes.trim() === '') {
            alert('Alasan penolakan tidak boleh kosong.');
            return;
        }
        try {
            await api.post(`validator/validations/${id}/reject`, { notes });
            alert('Permintaan validasi berhasil ditolak!');
            fetchValidations(); // Refresh daftar setelah aksi
        } catch (err) {
            alert('Gagal menolak permintaan validasi.');
            console.error(err);
        }
    };

    if (loading) {
        return <div>Memuat data...</div>;
    }

    if (error) {
        return <div>Terjadi kesalahan: {error}</div>;
    }

    return (
        <div>
            
            <main>
                <header className="jumbotron">
                    <div className="container text-center">
                        <h1 className="display-4">Dashboard Validator</h1>
                    </div>
                </header>

                <div className="container">
                    <div className="section-header mb-4">
                        <h4 className="section-title text-muted font-weight-normal">
                            Permintaan Validasi Baru
                        </h4>
                    </div>

                    <div className="row">
                        {validations.length > 0 ? (
                            validations.map((v) => (
                                <div key={v.id} className="col-md-6 mb-4">
                                    <div className="card card-default">
                                        <div className="card-header border-0">
                                            <h5 className="mb-0">Validasi dari {v.society.name}</h5>
                                        </div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th>NIK</th>
                                                        <td className="text-muted">{v.society.id_card_number}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Pekerjaan</th>
                                                        <td className="text-muted">{v.job}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Deskripsi Pekerjaan</th>
                                                        <td className="text-muted">{v.job_description || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Pendapatan</th>
                                                        <td className="text-muted">
                                                            Rp. {Number(v.income).toLocaleString('id-ID')}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Alamat</th>
                                                        <td className="text-muted">
                                                            {v.society.address}, {v.society.regional.district}, {v.society.regional.province}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between">
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleAccept(v.id)}
                                            >
                                                Terima
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleReject(v.id)}
                                            >
                                                Tolak
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-md-12">
                                <div className="alert alert-info">
                                    Tidak ada permintaan validasi yang tertunda.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ValidatorDashboardPage;