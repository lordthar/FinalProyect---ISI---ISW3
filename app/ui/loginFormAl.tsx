"use client"

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticateStudent } from '../lib/actions';


export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticateStudent, undefined);

  return (
    <form action={dispatch}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <a href="/" className="absolute top-4 left-4 text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="sr-only">Volver atrás</span>
            </a>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Login Alumnos</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                Correo
              </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="username"
                name="username"
                type="text"
                placeholder="Usuario"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
              />
              <p className="text-xs italic text-red-500 hidden">La contraseña es requerida.</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <LoginButton></LoginButton>
            </div>
            <div className="flex items-center justify-between">
              <a
                className="text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300"
                href="/matricula"
              >
                ¿Quieres Matricularte?
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-cover bg-center bg-gray-200">
            <img src="/ISI.png" alt="ISI" className="h-64 w-64 rounded-full shadow-lg" />
          </div>
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button className="sign-in-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" aria-disabled={pending}>Iniciar sesión</button>
  )

}



