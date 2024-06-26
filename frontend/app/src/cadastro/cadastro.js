import React, { useState } from 'react';
import axios from 'axios';
import './cadastro.css';
import { Link } from 'react-router-dom';

function Cadastro() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        cpf: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cpfError, setCpfError] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError('');
        setEmailError('');
        setCpfError('');
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.post('http://localhost:3000/check-email', { email });
            return response.data.exists;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    const checkCpfExists = async (cpf) => {
        try {
            const response = await axios.post('http://localhost:3000/check-cpf', { cpf });
            return response.data.exists;
        } catch (error) {
            console.error('Error checking CPF:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const emailExists = await checkEmailExists(form.email);
        if (emailExists) {
            setEmailError('Email já cadastrado');
            return;
        }

        const cpfExists = await checkCpfExists(form.cpf);
        if (cpfExists) {
            setCpfError('CPF já cadastrado');
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
            console.error("There was an error creating the account!", error);
        }
    };

    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="y2"><b>Cadastro</b></div>
                    <div className='user'>
                        <label className="y3">Usuário</label>
                        <input type="text" name="username" placeholder="Digite seu nome de usuário" value={form.username} onChange={handleChange} required />
                    </div>
                    <div className='email'>
                        <label className="y9">E-mail</label>
                        <input type="email" name="email" placeholder="@email.com" value={form.email} onChange={handleChange} required />
                        {emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className='cpf'>
                        <label className="y6">CPF</label>
                        <input type="text" placeholder="000.000.000-00" maxLength="14" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" name="cpf" value={form.cpf} onChange={handleChange} required />
                        {cpfError && <p className="error-message">{cpfError}</p>}
                    </div>
                    <div className='password'>
                        <label className="y4">Senha</label>
                        <input type="password" name="password" placeholder="Digite sua senha" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className='confirmPassword'>
                        <label className="y5">Confirmar senha</label>
                        <input type="password" name="confirmPassword" placeholder="Repita a sua senha" value={form.confirmPassword} onChange={handleChange} required />
                        {error && <p className="error-message">{error}</p>}
                    </div>
                    <button type="submit" className="y7">Cadastre-se</button>
                    <Link to="/login" className="y8">Já tem uma conta? Faça login</Link>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;