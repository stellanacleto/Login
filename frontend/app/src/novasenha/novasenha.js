import React, { useState } from 'react';
import axios from 'axios';
import './novasenha.css';
import { Link } from 'react-router-dom';

function Senha() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        cpf: '',
        password: '',
        confirmPassword: '',
       
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError(''); // Reset error message when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/cadastro', {
                username: form.username,
                email: form.email,
                password: form.password,
                cpf: form.cpf
            });
            console.log(response.data);
            // Redirecionar para a página de login ou outra página após o cadastro
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Email já cadastrado
                setError('Email já cadastrado');
            } else {
                console.error("There was an error creating the account!", error);
            }
        }
    };

    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="y2"><b>Esqueceu sua senha?</b></div>
                    <div className='email'>
                        <label className="ns9">E-mail</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className='password'>
                        <label className="ns4">Senha</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className='confirmPassword'>
                        <label className="ns5">Confirmar senha</label>
                        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                        {error && <p className="error-message">{error}</p>}
                    </div>
                    <button type="submit" className="ns7">Cadastrar nova senha</button>
                    <Link to="/login" className="ns8">Já tem uma conta? Faça login</Link>
                </div>
            </form>
        </div>
    );
}

export default Senha;
