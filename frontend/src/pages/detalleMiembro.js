// frontend/src/pages/MemberDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function MemberDetail() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await api.get(`/members/${id}`);
                setMember(response.data);
                setLoading(false);
            } catch (err) {
                setError('Miembro no encontrado o error al cargar los detalles.');
                setLoading(false);
                console.error("Error fetching member detail:", err);
            }
        };
        fetchMember();
    }, [id]); 

    const formatDateTime = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        return date.toLocaleString('es-AR', { 
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    if (loading) {
        return <p>Cargando detalles del miembro...</p>;
    }

    if (error) {
        return <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>;
    }

    if (!member) {
        return <p>Miembro no disponible.</p>; 
    }

    return (
        <div style={{ maxWidth: '700px', margin: 'auto', padding: '25px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Detalles del Miembro: {member.alias}</h2>
            <div style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
                <p><strong>Nombre Real:</strong> {member.name}</p>
                <p><strong>Habilidades:</strong> <span style={{ whiteSpace: 'pre-wrap' }}>{member.abilities}</span></p>
                <p><strong>Equipo:</strong> {member.team}</p>
                <p><strong>Estado:</strong> {member.status ? 'Activo' : 'Inactivo'}</p>
                <p><strong>Última Misión:</strong> {formatDateTime(member.lastMission)}</p>
            </div>
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                <Link to={`/members/edit/${member.id}`} style={{
                    textDecoration: 'none',
                    backgroundColor: '#ffc107',
                    color: 'black',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    flexGrow: 1,
                    textAlign: 'center'
                }}>
                    Editar Miembro
                </Link>
                <button
                    onClick={() => navigate('/members')}
                    style={{
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1em',
                        fontWeight: 'bold',
                        flexGrow: 1,
                        textAlign: 'center'
                    }}
                >
                    Volver a la Lista
                </button>
            </div>
        </div>
    );
}

export default MemberDetail;