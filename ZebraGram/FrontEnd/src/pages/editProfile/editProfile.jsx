import "./editProfile.css";

import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage } from "../../slices/userSlice.js";

// Components
import Message from "../../components/Message/Message";


const editProfile = () => {

  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);



  // fill user form
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);
  



  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div id="profile">
        <h2>Edite seus dados</h2>
        <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre você</p>
        {/* Preview da imagem */}

        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""}/>
            <input type='email' placeholder='E-mail' disabled  value={email || ""}/>
            <label>
                <span>Imagem do perfil: </span>
                <input type='file'/>
            </label>
            <label>
                <span>Bio: </span>
                <input type="text" placeholder='Descrição do perfil' onChange={(e) => setBio(e.target.value)} value={bio || ""}  />
            </label>
            <label>
                <span>Quer alterar senha?</span>
                <input type="password" placeholder='Nova senha' onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
            </label>
            <input type='submit' value="Atualizar"/>

        </form>
    </div>
  )
}

export default editProfile