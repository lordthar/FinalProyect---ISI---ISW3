"use client"

import React, { useState } from 'react';
import { createProspectSolicitud } from '../lib/actions';
import {v4 as uuid} from 'uuid';
function SolicitudPage() {
  const [titulo, setTitulo] = useState('');
  const [correo, setCorreo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    const formData = {
      id:uuid(),
      titulo,
      correo,
      descripcion
    }
    createProspectSolicitud(formData)
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Enviar Reclamo o Solicitud</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">Título del Reclamo:</label>
            <input
              type="text"
              id="titulo"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-gray-700 font-bold mb-2">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="descripcion" className="block text-gray-700 font-bold mb-2">Descripción del Reclamo:</label>
            <textarea
              id="descripcion"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SolicitudPage;
