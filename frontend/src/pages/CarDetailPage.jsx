// src/pages/CarDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';


const CarDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonths, setSelectedMonths] = useState('');
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');
    const [totalPerMonth, setTotalPerMonth] = useState(0);

    useEffect(() => {
        const fetchCarDetail = async () => {
            try {
                const response = await api.get(`instalment_cars/${id}`);
                setCar(response.data.instalment);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch car details');
                setLoading(false);
                console.error(err);
            }
        };
        fetchCarDetail();
    }, [id]);

    useEffect(() => {
        if (car && selectedMonths) {
            const selectedTenor = car.available_month.find(
                (item) => item.month.toString() === selectedMonths
            );
            if (selectedTenor) {
                setTotalPerMonth(car.price / selectedTenor.month);
            }
        }
    }, [selectedMonths, car]);

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            // Perbaikan: Ganti instalment_id menjadi installment_id
            const response = await api.post('applications', {
                installment_id: car.id, // Pastikan ini sesuai dengan validasi backend
                months: parseInt(selectedMonths),
                notes: notes,
            });
            setMessage(response.data.message);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to apply for installment');
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!car) {
        return <div>Car not found.</div>;
    }

    return (
        <div>
            
            <main>
                <header className="jumbotron">
                    <div className="container text-center">
                        <div>
                            <h1 className="display-4">{car.car_name}</h1>
                            <span className="text-muted">Brand : {car.brand}</span>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Description</h3>
                                {car.description}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Price : <span className="badge badge-primary">Rp. {Number(car.price).toLocaleString('id-ID')}</span></h3>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleApply}>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <h3>Select Months</h3>
                                    <select
                                        name="months"
                                        className="form-control"
                                        value={selectedMonths}
                                        onChange={(e) => setSelectedMonths(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Pilih Tenor --</option>
                                        {car.available_month.map((item) => (
                                            <option key={item.month} value={item.month}>
                                                {item.month} Months
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {selectedMonths && (
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <h3>Nominal/Month : <span className="badge badge-primary">Rp. {Number(totalPerMonth).toLocaleString('id-ID')}</span></h3>
                                    </div>
                                </div>
                            )}

                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Notes</label>
                                    </div>
                                    <textarea
                                        className="form-control"
                                        cols="30"
                                        rows="6"
                                        placeholder="Explain why your installment should be approved"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <button className="btn btn-primary btn-lg" type="submit">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {message && <p className="alert alert-info">{message}</p>}
                </div>
            </main>
        </div>
    );
};

export default CarDetailPage;