// frontend/src/pages/MemberList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import api from '../services/api'; 

function MemberList() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('/members'); 
                setMembers(response.data); 
                setLoading(false); 
            } catch (err) {
                setError('Error al cargar los miembros. Por favor, intente de nuevo más tarde.');
                setLoading(false);
                console.error("Error fetching members:", err); 
            }
        };
        fetchMembers(); 
    }, []); 

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este miembro? Esta acción no se puede deshacer.')) {
            try {
                await api.delete(`/members/${id}`); 
                setMembers(members.filter(member => member.id !== id));
                alert('Miembro eliminado con éxito.');
            } catch (err) {
                setError('Error al eliminar el miembro.');
                console.error("Error deleting member:", err);
            }
        }
    };

    if (loading) {
        return <p>Cargando miembros de S.H.I.E.L.D. Tech...</p>;
    }

    if (error) {
        return <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>;
    }

    if (members.length === 0) {
        return (
            <div>
                <p>No hay miembros registrados en la base de datos.</p>
                <Link to="/members/new" style={{ textDecoration: 'none', backgroundColor: '#007bff', color: 'white', padding: '10px 15px', borderRadius: '5px' }}>
                    ¡Registra un nuevo Avenger!
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Lista de Miembros de los Avengers</h2>
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <Link to="/members/new" style={{ textDecoration: 'none', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
                    Agregar Nuevo Miembro
                </Link>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f8f8', borderBottom: '2px solid #eee' }}>
                        <th style={tableHeaderStyle}>Alias</th>
                        <th style={tableHeaderStyle}>Nombre Real</th>
                        <th style={tableHeaderStyle}>Equipo</th>
                        <th style={tableHeaderStyle}>Estado</th>
                        <th style={tableHeaderStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={tableCellStyle}>{member.alias}</td>
                            <td style={tableCellStyle}>{member.name}</td>
                            <td style={tableCellStyle}>{member.team}</td>
                            <td style={tableCellStyle}>{member.status ? 'Activo' : 'Inactivo'}</td>
                            <td style={tableCellStyle}>
                                <Link to={`/members/${member.id}`} style={{ marginRight: '10px', color: '#007bff', textDecoration: 'none' }}>Ver</Link>
                                <Link to={`/members/edit/${member.id}`} style={{ marginRight: '10px', color: '#ffc107', textDecoration: 'none' }}>Editar</Link>
                                <button
                                    onClick={() => handleDelete(member.id)}
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '0.9em'
                                    }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const tableHeaderStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
    backgroundColor: '#e9ecef',
    color: '#555'
};

const tableCellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left'
};

export default MemberList;