import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './cadastro/cadastro';
import Login from './login/login';
import Teste from './teste/teste'; 
import PrivateRoute from './routes/privateRoutes';
//import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/teste" element={
                    <PrivateRoute>
                        <Teste />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
