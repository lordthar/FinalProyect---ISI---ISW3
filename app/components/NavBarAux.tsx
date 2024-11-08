import Link from 'next/link'
import React from 'react'

function NavBarAux() {
  return (
    <nav className="flex items-center justify-between bg-gray-800 py-4 shadow-lg">
    {/* Logo de la empresa */}
    <div className="flex items-center">
      <Link href="/">
        <img src="logo.png" alt="Logo de la empresa" className="h-10 mr-2 ml-2" />
      </Link>
      <span className="text-white text-lg font-bold">LF</span>
    </div>
    {/* Mensaje */}
    <div>
      <p className="text-white text-lg">Hola Administrador Aqui Estan las matrículas</p>
    </div>

    {/* Nombre de usuario logueado */}
    <div>
      <p className="text-white text-lg mr-4">Juan Perez</p>
    </div>
  </nav>

  )
}

export default NavBarAux