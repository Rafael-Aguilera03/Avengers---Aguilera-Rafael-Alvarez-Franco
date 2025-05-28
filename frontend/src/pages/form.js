// frontend/src/pages/MemberForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import api from '../services/api';

function MemberForm() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        name: '',
        alias: '',
        abilities: '',
        actor: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) { 
            setLoading(true);
            const fetchMember = async () => {
                try {
                    const response = await api.get(`/members/${id}`);
                    const memberData = response.data;
                    setFormData({
                        ...memberData,
                        lastMission: memberData.lastMission ? new Date(memberData.lastMission).toISOString().split('T')[0] : '',
                    });
                } catch (err) {
                    setError('Error al cargar los datos del miembro para edición.');
                    console.error("Error fetching member for edit:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchMember();
        }
    }, [id]); 
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value, 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setError(null); 

        try {
            const dataToSend = {
                ...formData,
                lastMission: formData.lastMission ? new Date(formData.lastMission).toISOString() : null,
            };

            if (id) {
                await api.put(`/members/${id}`, dataToSend);
                alert('Miembro actualizado con éxito.');
            } else {
                await api.post('/members', dataToSend);
                alert('Miembro creado con éxito.');
            }
            navigate('/members'); 
        } catch (err) {
            console.error("Error submitting form:", err);
            const errorMessage = err.response?.data?.message || 'Error al guardar el miembro. Por favor, intente de nuevo.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading && id) { 
        return <p>Cargando datos del miembro para edición...</p>;
    }
    if (error) {
        return <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>{id ? 'Editar Miembro' : 'Agregar Nuevo Miembro'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <div style={formGroupStyle}>
                    <label style={labelStyle} htmlFor="name">Nombre Real:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle} htmlFor="alias">Alias (Superhéroe):</label>
                    <input type="text" id="alias" name="alias" value={formData.alias} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle} htmlFor="abilities">Habilidades:</label>
                    <textarea id="abilities" name="abilities" value={formData.abilities} onChange={handleChange} required rows="5" style={{ ...inputStyle, resize: 'vertical' }}></textarea>
                </div>
                
                <div style={formGroupStyle}>
                    <label style={labelStyle} htmlFor="actor">Actor:</label>
                    <input type="text" id="actor" name="actor" value={formData.actor} onChange={handleChange} required style={inputStyle} />
                </div>



                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button
                        type="submit"
                        disabled={loading} 
                        style={{
                            ...buttonStyle,
                            backgroundColor: '#007bff',
                            ':hover': { backgroundColor: '#0056b3' } 
                        }}
                    >
                        {loading ? 'Guardando...' : (id ? 'Guardar Cambios' : 'Crear Miembro')}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/members')}
                        disabled={loading}
                        style={{
                            ...buttonStyle,
                            backgroundColor: '#6c757d',
                            ':hover': { backgroundColor: '#5a6268' }
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555'
};

const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1em',
};

const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: 'bold',
};

export default MemberForm;