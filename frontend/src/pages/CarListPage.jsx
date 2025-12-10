import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';


const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carsResponse = await api.get('instalment_cars');
                // Perbaikan: Lakukan pengecekan data sebelum di-set ke state
                if (carsResponse.data && carsResponse.data.instalment_cars) {
                    setCars(carsResponse.data.instalment_cars);
                } else {
                    setCars([]);
                }

                const applicationsResponse = await api.get('applications');
                // Perbaikan: Lakukan pengecekan data sebelum di-set ke state
                if (applicationsResponse.data && applicationsResponse.data.instalments) {
                    setApplications(applicationsResponse.data.instalments);
                } else {
                    setApplications([]);
                }
                
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Gagal mengambil data mobil atau aplikasi.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Memuat data...</div>;
    }

    if (error) {
        return <div>Terjadi kesalahan: {error}</div>;
    }

    const hasApplied = (carId) => {
        return applications.some(app => app.id === carId);
    };

    return (
        <div>
           
            <main>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Cars</h1>
                    </div>
                </header>

                <div className="container mb-5">
                    <div className="section-header mb-4">
                        <h4 className="section-title text-muted font-weight-normal">List of Cars</h4>
                    </div>

                    <div className="section-body">
                        {cars.length > 0 ? (
                            cars.map(car => (
                                <article key={car.id} className={`spot ${hasApplied(car.id) ? 'unavailable' : ''}`}>
                                    <div className="row">
                                        <div className="col-5">
                                            <h5 className="text-primary">{car.car_name}</h5>
                                            <span className="text-muted">{car.brand}</span>
                                        </div>
                                        <div className="col-4">
                                            <h5>Available Month</h5>
                                            {car.available_month && (
                                                <span className="text-muted">
                                                    {car.available_month.map(am => `${am.month} Months`).join(', ')}
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-3">
                                            {hasApplied(car.id) ? (
                                                <div className="bg-success text-white p-2">
                                                    Anda sudah mengajukan
                                                </div>
                                            ) : (
                                                <button
                                                    className="btn btn-danger btn-lg btn-block"
                                                    onClick={() => navigate(`/instalment_cars/${car.id}`)}
                                                >
                                                    Detail
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p>Tidak ada mobil yang tersedia saat ini.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CarListPage;