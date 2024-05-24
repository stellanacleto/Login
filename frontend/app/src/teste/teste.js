import React from 'react';
import { useNavigate } from 'react-router-dom';
import './teste.css';

const Teste = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirecionar para a página de login após o logoff
  };

  return (
    <div className='teste-container'>
      <h2>Teste</h2>
      <button className='btn-teste' onClick={handleLogout}>Log Off</button>
    </div>
  );
};

export default Teste;
