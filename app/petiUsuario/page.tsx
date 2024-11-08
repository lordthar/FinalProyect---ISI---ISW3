import React from 'react'
import NavBarPeti from '../components/NavBarAlum'
import { getSolicitudes } from '../lib/actions'

async function petiPage() {

  const solicitudes = await getSolicitudes();
  return (
    <div className="bg-gray-200 mb-10">
      <NavBarPeti/>

      {solicitudes.map((item) => {
        return(
          <div className="max-w-xl bg-white shadow-md rounded-md p-6 mx-auto mb-4">
            <h2 className="text-xl font-semibold mb-4">Solicitud Aspirante</h2>
            <div className="mb-4">
              <p className="text-gray-700 font-medium">Título:</p>
              <p className="text-gray-900">{item.titulo}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-medium">Correo:</p>
              <p className="text-gray-900">{item.correo}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-medium">Descripción:</p>
              <p className="text-gray-900">{item.descripcion}</p>
            </div>
          </div>
        )
      })}


    </div>
  )
}

export default petiPage
