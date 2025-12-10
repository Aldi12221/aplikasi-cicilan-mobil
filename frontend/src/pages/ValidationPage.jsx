import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';


const ValidationPage = () => {
    const navigate = useNavigate();
    const [isWorking, setIsWorking] = useState('yes');
    const [formData, setFormData] = useState({
        job: '',
        job_description: '',
        income: '',
        reason_accepted: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleJobStatusChange = (e) => {
        setIsWorking(e.target.value);
        // Reset form jika status pekerjaan berubah
        setFormData({
            job: '',
            job_description: '',
            income: '',
            reason_accepted: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Buat payload dinamis berdasarkan status pekerjaan
        let payload = {};
        if (isWorking === 'yes') {
            payload = {
                job: formData.job,
                job_description: formData.job_description,
                income: formData.income,
                reason_accepted: formData.reason_accepted,
            };
        } else {
            payload = {
                reason_accepted: formData.reason_accepted,
            };
        }
        
        try {
            await api.post('validation', payload);
            setMessage('Permintaan validasi berhasil dikirim!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Gagal mengirim permintaan validasi.';
            setError(errorMsg);
            console.error(err);
        }
    };

    return (
        <div>
            
            <main>
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Request Data Validation</h1>
                    </div>
                </header>

                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            {error && (
                                <div className="col-md-12">
                                    <div className="alert alert-danger">{error}</div>
                                </div>
                            )}
                            {message && (
                                <div className="col-md-12">
                                    <div className="alert alert-success">{message}</div>
                                </div>
                            )}
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Are you working?</label>
                                        <select
                                            className="form-control-sm"
                                            value={isWorking}
                                            onChange={handleJobStatusChange}
                                        >
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    {isWorking === 'yes' && (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Your Job"
                                                className="form-control mt-2 mb-2"
                                                name="job"
                                                value={formData.job}
                                                onChange={handleChange}
                                                required
                                            />
                                            <textarea
                                                className="form-control"
                                                cols="30"
                                                rows="5"
                                                placeholder="describe what you do in your job"
                                                name="job_description"
                                                value={formData.job_description}
                                                onChange={handleChange}
                                            ></textarea>
                                            <input
                                                type="number"
                                                placeholder="Income (Rp)"
                                                className="form-control mt-2"
                                                name="income"
                                                value={formData.income}
                                                onChange={handleChange}
                                                required
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Reason Accepted</label>
                                    </div>
                                    <textarea
                                        className="form-control"
                                        cols="30"
                                        rows="6"
                                        placeholder="Explain why you should be accepted"
                                        name="reason_accepted"
                                        value={formData.reason_accepted}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">
                            Send Request
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ValidationPage;