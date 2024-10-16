import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { register, reset } from "../../slices/authSlice";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  useEffect(() => {
    // Resetar o estado ao entrar na página de registro
    dispatch(reset());

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: error,
        background: '#121212',
        color: '#fff',          
      });
      dispatch(reset()); // Resetar o estado após exibir o erro
    }

    if (success) {
      Swal.fire({
        icon: 'success',
        title: `Bem-vindo, ${name}!`,
        text: 'Seu cadastro foi realizado com sucesso.',
        background: '#121212',
        color: '#fff',
      });
      dispatch(reset()); // Resetar o estado após exibir o sucesso
    }
  }, [error, success, dispatch, name]);

  return (
    <div id="register">
      <h2>Zebragram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input
          type="password"
          placeholder="Confirmar a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        <p>
          Já tem conta? <Link to="/login">Clique aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
