import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError(''); // Reset the error message when the user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                username: form.username,
                password: form.password
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/teste');  // Redirecionar para a página principal após o login
        } catch (error) {
            setError('Usuário ou senha incorreta');
            console.error("There was an error logging in!", error);
        }
    };

    return (
        <div className='login-form-wrap'>
            
                <div>                  
                    <form className='login-form' onSubmit={handleSubmit}>
                    <div className="logo-background">
                        <img className="img-logo" src="https://www.smartrural.com.br/assets/images/logo.png" alt="logo"></img>
                    </div>
                        
                    <label className="texto">Usuário</label>
                    <input type="text" name="username" value={form.username} onChange={handleChange} required />
                     
                    <label className="texto">Senha</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required />
                    
                    {error && <p className="error-message">{error}</p>}

                    <div className='btn'>
                        <button type="submit" className="btn-login">Entrar</button>
                    <Link to="/cadastro" className="btn-login">Cadastre-se</Link>
                    </div>    
                                           
                    </form>
            </div>
        </div>
    );
}

export default Login;
