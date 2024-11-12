
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { getUser } from '../lib/actions'

async function NavBarAux() {

  const cookieStore = cookies()
  const username = cookieStore.get("userUsername")

  const user = (await getUser(username?.value))

  return (
    <nav className="flex items-center justify-between bg-gray-800 py-4 shadow-lg">
    {/* Logo de la empresa */}
    <div className="flex items-center">
      <Link href="/">
        <img src="/ISI.png" alt="Logo de la empresa" className="h-10 mr-2 ml-2" />
      </Link>
    </div>
    {/* Mensaje */}
    <div>
      <p className="text-white text-lg">Hola Administrador {user?.nombre} Aqui Estan las matrículas</p>
    </div>

    {/* Nombre de usuario logueado */}
    <div>
    </div>
  </nav>

  )
}

export default NavBarAux