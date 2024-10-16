import './Auth.css';

// componentes
import { Link } from 'react-router-dom';
import Message from '../../components/Message/Message';
import Swal from 'sweetalert2'; // Importar o SweetAlert

// Hooks
import { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 

// Redux
import { login, reset } from '../../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    dispatch(login(user));
  };

  // clean states and handle alerts
  useEffect(() => {
    // Limpar o estado quando o componente é montado
    dispatch(reset());

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao fazer login',
        text: error,
        background: '#121212',
        color: '#fff',
      });
      dispatch(reset()); // Limpar o estado após mostrar o erro
    }

    if (success && !loading) {
      Swal.fire({
        icon: 'success',
        title: 'Login realizado com sucesso!',
        text: `Bem-vindo de volta!`,
        background: '#121212',
        color: '#fff',
      });
      dispatch(reset()); // Limpar o estado após o sucesso
    }
  }, [error, success, loading, dispatch]);

  return (
    <div id="login">
      <h2>Zebragram</h2>
      <p className='subtitle'>Faça o login para ver o que há de novo.</p>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='E-mail' 
          onChange={(e) => setEmail(e.target.value)} 
          value={email || ''} 
        />
        <input 
          type='password' 
          placeholder='Senha' 
          onChange={(e) => setPassword(e.target.value)} 
          value={password || ''} 
        />

        <input type='submit' value="Entrar" disabled={loading} />
        {loading && <p>Aguarde...</p>}
      </form>
      <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
    </div>
  );
}

export default Login;
