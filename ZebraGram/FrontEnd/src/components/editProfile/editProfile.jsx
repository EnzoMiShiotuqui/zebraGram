import './editProfile.css'

import React from 'react'

const editProfile = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div id="profile">
        <h2>Edite seus dados</h2>
        <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre você</p>
        {/* Preview da imagem */}

        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Nome'/>
            <input type='email' placeholder='E-mail' disabled/>
            <label>
                <span>Imagem do perfil: </span>
                <input type='file'/>
            </label>
            <label>
                <span>Bio: </span>
                <input type="text" placeholder='Descrição do perfil'/>
            </label>
            <label>
                <span>Quer alterar senha?</span>
                <input type="password" placeholder='Nova senha'/>
            </label>
            <input type='submit' value="Atualizar"/>

        </form>
    </div>
  )
}

export default editProfile