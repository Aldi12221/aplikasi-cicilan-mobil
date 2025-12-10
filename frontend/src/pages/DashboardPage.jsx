import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


const DashboardPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [validation, setValidation] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const validationRes = await api.get('validation/s');
                setValidation(validationRes.data.validation);

                const applicationsRes = await api.get('applications');
                setApplications(applicationsRes.data.instalments);

                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Gagal mengambil data dashboard.');
                setLoading(false);
                console.error('Error fetching dashboard data:', err);
            }
        };

        fetchDashboardData();
    }, [user]);

    if (loading) {
        return <div>Memuat data...</div>;
    }

    if (error) {
        return <div>Terjadi kesalahan: {error}</div>;
    }

    const formatPrice = (price) => {
        return `Rp. ${Number(price).toLocaleString('id-ID')}`;
    };

    return (
        <div>
            
            <main>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Dashboard</h1>
                    </div>
                </header>

                <div className="container">
                    <section className="validation-section mb-5">
                        <div className="section-header mb-3">
                            <h4 className="section-title text-muted">My Data Validation</h4>
                        </div>
                        <div className="row">
                            {!validation ? (
                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-header">
                                            <h5 className="mb-0">Data Validation</h5>
                                        </div>
                                        <div className="card-body">
                                            <Link to="/validation/request" className="btn btn-primary btn-block">
                                                + Request validation
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-header border-0">
                                            <h5 className="mb-0">Data Validation</h5>
                                        </div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>
                                                            <span className={`badge badge-${validation.status === 'accepted' ? 'success' : validation.status === 'rejected' ? 'danger' : 'info'}`}>
                                                                {validation.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Job</th>
                                                        <td className="text-muted">{validation.job || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Income/Month</th>
                                                        <td className="text-muted">{validation.income ? formatPrice(validation.income) : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Validator</th>
                                                        <td className="text-muted">{validation.validator?.name || '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Validator Notes</th>
                                                        {/* Perbaikan: Menampilkan catatan jika ada */}
                                                        <td className="text-muted">{validation.validator_notes || '-'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="validation-section mb-5">
                        <div className="section-header mb-3">
                            <div className="row">
                                <div className="col-md-8">
                                    <h4 className="section-title text-muted">My Installment Cars</h4>
                                </div>
                                <div className="col-md-4">
                                    {validation?.status === 'accepted' ? (
                                        <Link to="/instalment_cars" className="btn btn-primary btn-lg btn-block">
                                            + Add Installment Cars
                                        </Link>
                                    ) : (
                                        <a href="#" className="btn btn-primary btn-lg btn-block disabled">
                                            + Add Installment Cars
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="row mb-4">
                                {validation?.status !== 'accepted' && (
                                    <div className="col-md-12">
                                        <div className="alert alert-warning">
                                            Your validation must be approved by validator to Installment Cars.
                                        </div>
                                    </div>
                                )}
                                {validation?.status === 'accepted' && applications.length > 0 ? (
                                    applications.map(app => (
                                        <div key={app.id} className="col-md-6 mb-4">
                                            <div className="card card-default">
                                                <div className="card-header border-0">
                                                    <h5 className="mb-0">{app.car} - {app.brand?.name || '-'}</h5>
                                                </div>
                                                <div className="card-body p-0">
                                                    <table className="table table-striped mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <th>Description</th>
                                                                <td className="text-muted">{app.description}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Price</th>
                                                                <td className="text-muted">{formatPrice(app.price)}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Installment</th>
                                                                <td className="text-muted">
                                                                    {app.applications[0]?.months} Months
                                                                    <span className={`badge badge-${app.applications[0]?.apply_status === 'accepted' ? 'success' : app.applications[0]?.apply_status === 'rejected' ? 'danger' : 'info'} ml-2`}>
                                                                        {app.applications[0]?.apply_status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Apply Date</th>
                                                                <td className="text-muted">{new Date(app.applications[0]?.created_at).toLocaleDateString()}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Notes</th>
                                                                <td className="text-muted">{app.applications[0]?.notes || '-'}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    validation?.status === 'accepted' && <p>Anda belum mengajukan cicilan.</p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;