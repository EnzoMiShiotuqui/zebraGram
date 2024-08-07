import "./Auth.css"

// Components
import { Link } from "react-router-dom"

// Hooks
import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

// redux
import {register, reset} from '../../slices/authSlice'

const Register = () => {

  // Criando States
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()

  const {loading, error} = useSelector((state) => state.auth)


  const handleSubmit = (e) => {
    e.preventDefault()

    // Setando o user
    const user = {
      name,
      email,
      password, 
      confirmPassword
    }

    console.log(user)

    dispatch(register(user))
  };

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id="register">
      <h2>Zebragram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""} />
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
        <input type="password" placeholder="Confirmar a senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""}/>
        <input type="submit" value="Cadastrar"/>
        <p>Já tem conta? <Link to="/login">Clique aqui</Link></p>
      </form>
    </div>
  )
}

export default Register