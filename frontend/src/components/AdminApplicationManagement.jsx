import React, { useState, useEffect } from 'react';
import api from '../api/api';

const AdminApplicationManagement = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await api.get('admin/applications');
            setApplications(response.data.applications);
        } catch (error) {
            console.error('Error fetching applications:', error);
            alert('Gagal mengambil data ajuan');
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menerima ajuan ini?')) return;

        try {
            await api.post(`admin/applications/${id}/accept`);
            alert('Ajuan berhasil diterima');
            fetchApplications();
        } catch (error) {
            console.error('Error accepting application:', error);
            alert(error.response?.data?.message || 'Gagal menerima ajuan');
        }
    };

    const handleReject = async (id) => {
        const notes = prompt('Masukkan alasan penolakan:');
        if (!notes) return;

        try {
            await api.post(`admin/applications/${id}/reject`, { notes });
            alert('Ajuan berhasil ditolak');
            fetchApplications();
        } catch (error) {
            console.error('Error rejecting application:', error);
            alert(error.response?.data?.message || 'Gagal menolak ajuan');
        }
    };

    const filteredApplications = applications.filter(app => {
        if (filter === 'all') return true;
        return app.apply_status === filter;
    });

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'badge bg-warning text-dark',
            accepted: 'badge bg-success',
            rejected: 'badge bg-danger'
        };
        return badges[status] || 'badge bg-secondary';
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Manajemen Ajuan Cicilan</h3>

            <div className="mb-3">
                <label className="form-label">Filter Status:</label>
                <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ maxWidth: '200px' }}
                >
                    <option value="all">Semua</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Diterima</option>
                    <option value="rejected">Ditolak</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Daftar Ajuan ({filteredApplications.length})</h5>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Pemohon</th>
                                        <th>Kendaraan</th>
                                        <th>Brand</th>
                                        <th>Tenor</th>
                                        <th>Status</th>
                                        <th>Catatan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredApplications.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="text-center">Tidak ada data ajuan</td>
                                        </tr>
                                    ) : (
                                        filteredApplications.map(app => (
                                            <tr key={app.id}>
                                                <td>{new Date(app.created_at).toLocaleDateString('id-ID')}</td>
                                                <td>
                                                    <div>{app.society?.name}</div>
                                                    <small className="text-muted">{app.society?.id_card_number}</small>
                                                </td>
                                                <td>{app.installment?.car}</td>
                                                <td>{app.installment?.brand?.name}</td>
                                                <td>{app.months} bulan</td>
                                                <td>
                                                    <span className={getStatusBadge(app.apply_status)}>
                                                        {app.apply_status === 'pending' ? 'Pending' :
                                                            app.apply_status === 'accepted' ? 'Diterima' : 'Ditolak'}
                                                    </span>
                                                </td>
                                                <td>{app.notes || '-'}</td>
                                                <td>
                                                    {app.apply_status === 'pending' && (
                                                        <div className="btn-group" role="group">
                                                            <button
                                                                className="btn btn-sm btn-success"
                                                                onClick={() => handleAccept(app.id)}
                                                            >
                                                                Terima
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => handleReject(app.id)}
                                                            >
                                                                Tolak
                                                            </button>
                                                        </div>
                                                    )}
                                                    {app.apply_status !== 'pending' && (
                                                        <span className="text-muted">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminApplicationManagement;
