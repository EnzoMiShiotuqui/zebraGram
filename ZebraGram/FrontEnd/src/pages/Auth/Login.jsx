import './Auth.css'

// componentes
import { Link } from 'react-router-dom';
import Message from '../../components/Message/Message';

// Hooks
import { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 

// Redux


const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div id="login">
        <h2>Zebragram</h2>
        <p className='subtitle'>Faça o login para ver o que há de novo.</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email || ''}/>
          <input type='password' placeholder='Senha' onChange={(e) => setPassword(e.target.value)} value={password || ''}/>

          <input type='submit' value="Entrar"/>
        </form>
        <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
    </div>
  )
}

export default Login