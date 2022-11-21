import React from "react";
import {firebase} from './firebase'


function App() {
  //hooks
  const[nombre,setnombre]=React.useState('')
  const[apellido,setapellido]=React.useState('')
  const[id,setid]=React.useState('')
  const[lista,setlista]=React.useState([])
  const [edicion,setedicion]=React.useState(false)
  const [error,seterror]=React.useState(null)
  React.useEffect(()=>{
    
    

const obtenerDatos=async()=>{
  try {
    const db=firebase.firestore()
   const data=await db.collection('usuarios').get()
    const arrayData=data.docs.map((documento)=>({id:documento.id,...documento.data()}))
    setlista(arrayData)
  console.log(arrayData);
  } catch (error) {
    console.log(error);
  }
}
obtenerDatos()
  },[])
  const guardarDatos=async(e)=>{
    e.preventDefault()
    if (!nombre.trim()) {
      seterror('Ingrese Nombre')
      return
    }
    if (!apellido.trim()) {
      seterror('Ingrese Apellido')
      return
    }
    try {
      const db=firebase.firestore()
      const nuevousuario={
        nombre,apellido
      }
      //agregar a bd en firebase
      const dato=await db.collection('usuarios').add(nuevousuario)
      //agregar a lista
      setlista([
        ...lista,
        {id:dato.id,...nuevousuario}
      ])

    } catch (error) {
      console.log(error)
    }
    //limpiar los estados
    setnombre('')
    setapellido('')
    setid('')
    seterror('')
  }
  //eliminar
  const eliminardato=async(id)=>{
    try {
      const db=firebase.firestore()
      await db.collection('usuarios').doc(id).delete()
      const listafiltrada=lista.filter((elemento)=>elemento.id!==id)
      setlista(listafiltrada)
    } catch (error) {
      console.log(error)
    }
  }
  //funcion para activar el modo edicion
  const editar=(elemento)=>{
    setedicion(true)
    setnombre(elemento.nombre)
    setapellido(elemento.apellido)
    setid(elemento.id)
  }
  //funcion para guardardatos
  const editardatos=async(e)=>{
    e.preventDefault()
    if (!nombre.trim()) {
      seterror('Ingrese Nombre')
      return
    }
    if (!apellido.trim()) {
      seterror('Ingrese Apellido')
      return
    }
    try {
      const db=firebase.firestore()
      await db.collection('usuarios').doc(id).update({nombre,apellido})
      const listaeditada=lista.map((elemento)=>elemento.id===id ?{id:id,nombre,apellido}:elemento)
      setlista(listaeditada)
      setedicion(false)
      setnombre('')
      setapellido('')
      setid('')
      seterror(null)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="Container">
     <div classname="row">
      <div classname="col-12">
        <h2 className="text-center">{edicion ? 'Edicion del Usuario' : 'Registro de Usuarios' }</h2>
        {
          error ?(<div className="alert alert-danger" role="alert">
            {error}
          </div>):
          null
        }
        <form onSubmit={edicion ? editardatos : guardarDatos}>
        
          <input type="text" placeholder="Ingrese Nombre" className="form-control my-2" onChange={(e)=>{setnombre(e.target.value)}} value={nombre}/>
          <input type="text" placeholder="Ingrese Apellido" className="form-control my-2" onChange={(e)=>{setapellido(e.target.value)}}value={apellido}/>
          <div className="d-grid gap-2">
          {
            edicion ? <button className="btn btn-success" type="submit">Editar</button>:
            <button className="btn btn-dark" type="submit">Agregar</button>
          }
          </div>

        </form>


      </div>

     </div>

     <hr/>
     <div className="row">
      <div className="col-12">
        <h2 className="text-center">Lista de Usuarios registrado</h2>
        <ul className="list-group">
        {
          lista.map(
            (elemento)=>(
              <li className="list-group-item" key={elemento.id}>{elemento.nombre} - {elemento.apellido}
              <button className="btn btn-warning float-end mx-2" onClick={()=>editar(elemento)}>Editar</button>
              <button className="btn btn-danger  float-end mx-2" onClick={()=>eliminardato(elemento.id)}>Eliminar</button>
              </li>
            )
          )
        }
        </ul>
        
      </div>
     </div>
    </div>
  );
}

export default App;
