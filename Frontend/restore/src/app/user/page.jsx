"use client"
import React from 'react'
import { fetchUsuario } from '../home/fetch'
import { Navbar } from '../components/navbar/navbar'
import defaultImage from "./defaultImage.jpg"
import Image from 'next/image'
import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation';

async function User({searchParams}) {
  const { data: session, status } = useSession(); 
  // const router = useRouter();
  if (!session) {
    // router.push('/login');
    return "Debes estar logueado para ver tu perfil"
  }
  const usuario = await fetchUsuario(searchParams.User)
  return (
    <>
  <Navbar></Navbar>
  <button>Editar perfil</button>
  <div className="flex items-center">
  <Image src={session ? session.user.image : defaultImage} alt="imagen" height={100} width={100}/>
  <p> </p>
    <div className="ml-4">
      <p className="text-lg font-bold">Nombre: {usuario.nombre}</p>
      <p className="text-lg font-bold">Apellido: {usuario.apellido}</p>
      <p className="text-lg font-bold">Email: {usuario.email}</p>
      <p className="text-lg font-bold">Día de nacimiento: {usuario.fechaNacimiento}</p>
    </div>
  </div>
  {/* <div className="mt-4">
    <h3 className="text-xl font-bold">Ubicación</h3>
    <p className="text-lg">Ciudad: {usuario.ubicacion[0].ciudad ? usuario.ubicacion[0].ciudad : "Falta completar"}</p>
    <p className="text-lg">Dirección: {usuario.ubicacion[0].direccion ? usuario.ubicacion[0].direccion :  "Falta completar"}</p>
    <p className="text-lg">Código Postal: {usuario.ubicacion[0].codigoPostal ? usuario.ubicacion[0].codigoPostal : "Falta completar"}</p>
  </div> */}
</>

  )
   }
export default User



