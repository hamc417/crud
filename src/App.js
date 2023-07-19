import {useState} from 'react'
import Home from './components/Home';
import Login from './components/Login';
import './App.css';

import firebaseapp from './credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(firebaseapp)

function App() {
  const [usuario, setUsuario] = useState(null);
  onAuthStateChanged(auth, (usuarioFirebase)=>{ //usuarioFirebase nombre cualquiera
    if(usuarioFirebase){    //si encuentra algo, lo almacena
      setUsuario(usuarioFirebase)
    }
   else{
      setUsuario(null) //si no hay info sigue en el mismo estado
   } 
  }) 
  
  
  return (
    <div>
      {usuario ? <Home correoUsuario={usuario.email}/> : <Login/>}
    </div>
  )
   
}

export default App;
