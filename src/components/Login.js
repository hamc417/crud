import React, { useState } from 'react'

import uno from '../assets/equipo.jpg';
import dos from '../assets/fonendo.jpg';
import tres from '../assets/guante.jpg';

import app from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

const Login = () => {
  const [registro, setRegistro] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const correo = event.target.email.value;
    const contrasena = event.target.contrasena.value;

    if (registro) {
      await createUserWithEmailAndPassword(auth, correo, contrasena)
    } else {
      await signInWithEmailAndPassword(auth, correo, contrasena)
    }
  }

  return (
    <div className='row container p-4 m-0'>
      <div className='col-md-8 container'>
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={uno} alt="" className='tamaño-imagen' />
            </div>
            <div className="carousel-item">
              <img src={dos} alt="" className='tamaño-imagen' />
            </div>
            <div className="carousel-item">
              <img src={tres} alt="" className='tamaño-imagen' />
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-4'>
        <div className='mt-5'>
          <h1>{registro ? 'Registrate' : "Inicia sesión"}</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label' >Email: </label>
              <input type="email" className='form-control' placeholder='Ingresar email' id='email' required />

              <label className='form-label'>Contraseña </label>
              <input type="password" className='form-control' placeholder='Ingresar contraseña' id='contrasena' required />

            </div>
            <div className='d-flex justify-content-center align-items-center'>

              <button className='btn btn-primary' type='submit'>
                {registro ? "Registrate" : "Inicia sesión"}
              </button>
            </div>
          </form>

          <div className='form-group '>
            <button className='btn btn-secondary mt-4 form-control' onClick={() => setRegistro(!registro)}>
              {registro ? 'Ya tienes una cuenta? Inicia sesión' : 'No tienes cuenta? Registrate'}

            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
