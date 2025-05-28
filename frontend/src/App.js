// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MemberList from './pages/miembros';
import MemberForm from './pages/form';
import MemberDetail from './pages/detalleMiembro';

import './App.css'; 

function App() {
    return (
        <Router> 
            <div className="App">
                <header style={{ backgroundColor: '#20232a', padding: '20px', color: 'white', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                    <h1>S.H.I.E.L.D. Tech: Gestión de Avengers</h1>
                    <nav style={{ marginTop: '15px' }}>
                        <Link to="/members" style={{ color: '#61dafb', textDecoration: 'none', margin: '0 20px', fontSize: '1.3em', fontWeight: 'bold' }}>
                            Miembros de los Avengers
                        </Link>
                    </nav>
                </header>

                <main style={{ padding: '30px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 80px)' }}> {/* Ajusta minHeight */}
                    <Routes> 
                        <Route path="/" element={<MemberList />} />
                      
                        <Route path="/members" element={<MemberList />} />

                        <Route path="/members/new" element={<MemberForm />} />
                        <Route path="/members/edit/:id" element={<MemberForm />} />

                        <Route path="/members/:id" element={<MemberDetail />} />

                        <Route path="*" element={<h2 style={{ textAlign: 'center', color: '#dc3545' }}>404 - Página no encontrada</h2>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;