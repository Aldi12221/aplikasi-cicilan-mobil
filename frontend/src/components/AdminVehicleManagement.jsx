import React, { useState, useEffect } from 'react';
import api from '../api/api';

const AdminVehicleManagement = () => {
    const [vehicles, setVehicles] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        brand_id: '',
        car: '',
        description: '',
        price: '',
        available_months: [{ month: '', description: '', nominal: '' }]
    });

    useEffect(() => {
        fetchVehicles();
        fetchBrands();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await api.get('admin/vehicles');
            setVehicles(response.data.vehicles);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            alert('Gagal mengambil data kendaraan');
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await api.get('admin/brands');
            setBrands(response.data.brands);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMonthChange = (index, field, value) => {
        const newMonths = [...formData.available_months];
        newMonths[index][field] = value;
        setFormData({ ...formData, available_months: newMonths });
    };

    const addMonth = () => {
        setFormData({
            ...formData,
            available_months: [...formData.available_months, { month: '', description: '', nominal: '' }]
        });
    };

    const removeMonth = (index) => {
        const newMonths = formData.available_months.filter((_, i) => i !== index);
        setFormData({ ...formData, available_months: newMonths });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await api.put(`admin/vehicles/${editingId}`, formData);
                alert('Kendaraan berhasil diupdate');
            } else {
                await api.post('admin/vehicles', formData);
                alert('Kendaraan berhasil ditambahkan');
            }
            resetForm();
            fetchVehicles();
        } catch (error) {
            console.error('Error saving vehicle:', error);
            alert(error.response?.data?.message || 'Gagal menyimpan kendaraan');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (vehicle) => {
        setEditingId(vehicle.id);
        setFormData({
            brand_id: vehicle.brand_id,
            car: vehicle.car,
            description: vehicle.description || '',
            price: vehicle.price,
            available_months: vehicle.available_months.map(m => ({
                month: m.month,
                description: m.description || '',
                nominal: m.nominal
            }))
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus kendaraan ini?')) return;

        try {
            await api.delete(`admin/vehicles/${id}`);
            alert('Kendaraan berhasil dihapus');
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            alert('Gagal menghapus kendaraan');
        }
    };

    const resetForm = () => {
        setFormData({
            brand_id: '',
            car: '',
            description: '',
            price: '',
            available_months: [{ month: '', description: '', nominal: '' }]
        });
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Manajemen Kendaraan</h3>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Tutup Form' : 'Tambah Kendaraan'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">{editingId ? 'Edit Kendaraan' : 'Tambah Kendaraan Baru'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Brand</label>
                                    <select
                                        className="form-control"
                                        name="brand_id"
                                        value={formData.brand_id}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Pilih Brand</option>
                                        {brands.map(brand => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nama Mobil</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="car"
                                        value={formData.car}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Deskripsi</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Harga</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <h6 className="mt-4">Tenor Cicilan</h6>
                            {formData.available_months.map((month, index) => (
                                <div key={index} className="row mb-2 align-items-end">
                                    <div className="col-md-3">
                                        <label className="form-label">Bulan</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={month.month}
                                            onChange={(e) => handleMonthChange(index, 'month', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Deskripsi</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={month.description}
                                            onChange={(e) => handleMonthChange(index, 'description', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">Nominal/Bulan</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={month.nominal}
                                            onChange={(e) => handleMonthChange(index, 'nominal', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        {formData.available_months.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm w-100"
                                                onClick={() => removeMonth(index)}
                                            >
                                                Hapus
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm mb-3"
                                onClick={addMonth}
                            >
                                + Tambah Tenor
                            </button>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Menyimpan...' : 'Simpan'}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Daftar Kendaraan</h5>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Brand</th>
                                    <th>Mobil</th>
                                    <th>Harga</th>
                                    <th>Tenor</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map(vehicle => (
                                    <tr key={vehicle.id}>
                                        <td>{vehicle.brand?.name}</td>
                                        <td>{vehicle.car}</td>
                                        <td>Rp {parseInt(vehicle.price).toLocaleString('id-ID')}</td>
                                        <td>
                                            {vehicle.available_months?.map(m => m.month).join(', ')} bulan
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() => handleEdit(vehicle)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(vehicle.id)}
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminVehicleManagement;
