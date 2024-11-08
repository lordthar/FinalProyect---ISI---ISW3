"use client"
import React, {FormEvent, useState } from 'react';
import { createProspect } from '../lib/actions';
import {v4 as uuid} from 'uuid';

function matricula() {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefonos, setTelefonos] = useState('');
  const [correo, setCorreo] = useState('');
  const [curso, setCurso] = useState('seleciona un curso');
  const [libretaMilitar, setLibretaMilitar] = useState('');
  const [certificados, setCertificados] = useState('');
  const [fotoUsuario, setFotoUsuario] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>  {
    event.preventDefault();
    const datosFormulario = {
      id:uuid(),
      nombre,
      apellido,
      cedula,
      telefonos,
      correo,
      curso,
      libretaMilitar,
      certificados,
      fotoUsuario
    }
    createProspect(datosFormulario);
  };
 

  return (
<body className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex items-center justify-center py-12">
  <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg px-10 py-12 relative">
    <a href="/" className="absolute top-4 left-4 text-blue-600 hover:text-blue-800">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="sr-only">Volver atrás</span>
    </a>
    <div className="text-center mb-8">
      <img src="/ISI.png" alt="Imagen del instituto" className="w-32 h-auto mx-auto mb-4" />
      <h2 className="text-4xl font-bold text-gray-800">Matricúlate</h2>
    </div>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input id="nombre" name="nombre" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
        <input id="apellido" name="apellido" type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">Cédula</label>
        <input id="cedula" name="cedula" type="text" required value={cedula} onChange={(e) => setCedula(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input id="telefono" name="telefono" type="text" required value={telefonos} onChange={(e) => setTelefonos(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="curso" className="block text-sm font-medium text-gray-700">Curso</label>
        <select id="curso" name="curso" required value={curso} onChange={(e) => setCurso(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option disabled value="">Selecciona un curso</option>
          <option value="Escolta">Escolta</option>
          <option value="OMT">OMT</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Vigilancia">Vigilancia</option>
        </select>
      </div>
      <div>
        <label htmlFor="libreta_militar" className="block text-sm font-medium text-gray-700">Libreta Militar</label>
        <select id="libreta_militar" name="libreta_militar" required value={libretaMilitar} onChange={(e) => setLibretaMilitar(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option disabled value="">¿Tienes libreta militar?</option>
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label htmlFor="certificado" className="block text-sm font-medium text-gray-700">Certificado</label>
        <select id="certificado" name="certificado" required value={certificados} onChange={(e) => setCertificados(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option disabled value="">Selecciona un certificado</option>
          <option value="Bachiller">Bachiller</option>
          <option value="Universitario">Universitario</option>
        </select>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Matriculate</button>
      </div>
    </form>
  </div>
</body>

  );
}


export default matricula
