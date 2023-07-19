import React, { useEffect, useState } from 'react'
import firebase from '../credenciales';
import { getAuth, signOut } from 'firebase/auth';
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'; //importaciones para el crud en Base de datos

const auth = getAuth(firebase)
const db = getFirestore(firebase)
const Home = ({correoUsuario}) => {

    const valorInicial = {
        nombre: '',
        edad: '',
        profesion: '',
    }
    //variables de estado
    const [user, setuser] = useState(valorInicial);
    const [Lista, setLista] = useState([]);
    const [subid, setSubid] = useState(''); //para el update
    

    //Funcion para capturar inputs
    //CREATE
    const capturarInputs = (e)=>{
        const {name, value}= e.target;
        setuser({...user, [name]:value})  //copia de lo que hay en user y a name se le lleva value
    }


    //Funcion para actualizar o guardar datos

        const guardarDatos= async(e)=>{
            e.preventDefault();
            // console.log(user);

            if(subid === ''){  //si subid esta vacio, quiere decir que nadie ha pedido actualizacion

                try {               //Peticion POST, envia datos a BD
                    await addDoc(collection(db,'usuarios'), {  //db se declaro arriba pidiendo las credenciales, usuarios es el nombre de la coleccio(base de datos en firebase, ojo que el nombre sea igual)
                        ...user  //se le envia copia de la variable de estado
                    })
                } catch (error) {
                    console.log(error)
                }

            } else{
                await setDoc(doc(db, 'usuarios', subid), {      //actualizacion del campo
                    ...user
                })
            }

            setuser({...valorInicial})
            setSubid('');       //se reinicia para que no quede nada despues de usarlo
        }

        //Funcion para renderizar la lista de Usuarios

        // Peticion GET
        //READ
        useEffect(()=>{
            const getLista = async()=>{
                try{
                    const querySnapshot = await getDocs(collection(db, 'usuarios'))
                    const docs = [];
                    querySnapshot.forEach((doc)=>{
                        docs.push({...doc.data(), id:doc.id}) //une informacion del doc importado de firestore, con el id de ese mismo documento
                    })
                    setLista(docs) //cambio de estado de la lista con la info unida en docs
                }catch(error){
                    console.log(error)
                }
            }
                getLista(); // no se debe usar async directamente dentro del UseEfect, por eso se creo getlista y luego se llamo
        },[Lista])

        //Funcion para eliminar Usuario
        //DELETE

        const deleteUser = async(id)=>{
            await deleteDoc(doc(db,'usuarios', id))
        }

        const getOne = async(id)=>{
            try {
                const docRef = doc(db,'usuarios', id);
                const docSnap = await getDoc(docRef);
                setuser(docSnap.data());  //lleva la informacion al formulario para ser modificada
                
            } catch (error) {
                console.log(error)
            }
        }

        useEffect(() => {           //solo renderiza si hay cambio en subid
          if(subid !== ''){
            getOne(subid)
          }
        
        
        }, [subid]);
        


  return (
    <div className='container'>
        <div className='d-flex justify-content-between m-3'>

        <p>Bienvenido, <strong>{correoUsuario}</strong> <br/>Haz iniciado sesión </p>
        
        <button className='btn btn-primary ' onClick={()=>signOut(auth)}>
            Cerrar Sesión
        </button>
        </div>
        <hr/>
        <div className='row m-2'>
            {/* Funcion del formulario */}
            <div className='col-md-4'>
                <h3 className='text-center mb-3'>Ingresar Usuario</h3>
                <form onSubmit={guardarDatos}>
                    <div className='card card-body'>
                        <div className='form-group'>
                            <input type="text" 
                            name='nombre'
                            className='form-control mb-3' 
                            placeholder='Ingresar nombre de Usuario'
                            onChange={capturarInputs} value={user.nombre}/>

                            <input type="text" 
                            name='edad'
                            className='form-control mb-3' 
                            placeholder='Ingresar Edad de Usuario'
                            onChange={capturarInputs} value={user.edad}/>
                            

                            <input type="text" 
                            name='profesion'
                            className='form-control mb-3' 
                            placeholder='Ingresar Profesión de Usuario'
                            onChange={capturarInputs} value={user.profesion}/>
                            
                        </div>
                        <button className='btn btn-primary'>
                           {subid === '' ? 'Guardar' : 'Actualizar'}
                        </button>
                    </div>
                </form>

            </div>

            {/* Esta sera la lista de usuarios */}
            <div className='col-md-8 mb-3'>
                <h2 className='text-center mb-3'>Lista de Usuarios</h2>
                <div className='container card'>
                    <div className='card-body'>
                        {                       //recorrer la lista
                        Lista.map(list=>(
                            <div key={list.id}>
                                <p>Nombre: {list.nombre}</p>
                                <p>Edad: {list.edad}</p>
                                <p>Profesion: {list.profesion}</p>

                                <button className='btn btn-danger' onClick={()=>deleteUser(list.id)}>
                                    Eliminar
                                </button>
                                <button className='btn btn-success m-1' onClick={()=>setSubid(list.id)}>
                                    Actualizar
                                </button>
                                <hr></hr>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Home;
