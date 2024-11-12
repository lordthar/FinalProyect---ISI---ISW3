"use client"
import React, { useState, useEffect, FormEvent } from 'react';
import { eliminarProspect, getMatriculas, updateProspect } from '../lib/actions';
import Link from "next/link"
import Alert from '../components/alert';

let status: string | null = null;

function AuxiliarPage() {
  const [matriculas, setMatriculas] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [matricula, setMatricula] = useState<Matricula>({
    id: '',
    nombre: '',
    apellido: '',
    cedula: '',
    telefonos: '',
    correo: '',
    password: '',
    curso: '',
    libretamilitar: '',
    certificados: '',
    isactivo: true
  });

  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefonos, setTelefonos] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [curso, setCurso] = useState('seleciona un curso');
  const [libretamilitar, setLibretaMilitar] = useState('');
  const [certificados, setCertificados] = useState('');
  const [isactivo, setIsactivo] = useState(true);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const datosFormulario = {
      id,
      nombre,
      apellido,
      cedula,
      telefonos,
      correo,
      curso,
      password,
      libretamilitar,
      certificados,
      isactivo
    }
    updateProspect(datosFormulario);

    let matricula = matriculas.filter((item) =>
      item.id == id
    );

    matricula[0].nombre = nombre;
    matricula[0].apellido = apellido;
    matricula[0].cedula = cedula;
    matricula[0].telefonos = telefonos;
    matricula[0].correo = correo;
    matricula[0].password = password;
    matricula[0].curso = curso;
    matricula[0].libretamilitar = libretamilitar;
    matricula[0].certificados = certificados;
    matricula[0].isactivo = isactivo;

    setShowModal(false);
    triggerAlert('success', 'actualizacion exitosa!')
  };
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = (type: string, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);

    // Temporizador para ocultar la alerta después de 3 segundos
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // 3000ms = 3 segundos
  };

  const seleccionarMatricula = async (matricula: Matricula) => {
    setId(matricula.id);
    setNombre(matricula.nombre);
    setApellido(matricula.apellido);
    setCedula(matricula.cedula);
    setTelefonos(matricula.telefonos);
    setCorreo(matricula.correo);
    setPassword(matricula.password);
    setCurso(matricula.curso);
    setLibretaMilitar(matricula.libretamilitar);
    setCertificados(matricula.certificados);
    setIsactivo(matricula.isactivo)

    setMatricula(matricula);
  }

  const btnActualizar = async (matricula: Matricula) => {
    seleccionarMatricula(matricula);
    setShowModal(true);
  };

  const btnEliminar = async () => {
    eliminarProspect(matricula.id);
    async function fetchMatriculas() {
      const matriculasData = await getMatriculas();
      setMatriculas(matriculasData);
    };
    fetchMatriculas();
    filtarMatriculas(matriculas, search);
    triggerAlert('success', 'se elimino exitosamente!')
  }

  const handleActualizar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  function filtarMatriculas(matriculas: Matricula[], search: string) {
    if (search === "") {
      return matriculas;// Devuelve todas las matrículas si no hay búsqueda
    } else {
      return matriculas.filter((item) =>
        item.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  // Obtener las matrículas al cargar el componente
  useEffect(() => {
    async function fetchMatriculas() {
      const matriculasData = await getMatriculas();
      setMatriculas(matriculasData);
    }
    fetchMatriculas();
  }, []);

  // Filtrar las matrículas cada vez que cambia el valor de búsqueda
  const filteredMatriculas = filtarMatriculas(matriculas, search);

  // Manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-2">
      <div className='flex justify-center'>
        <input
          placeholder='buscar por nombre de estudiante 🔍'
          className='border rounded border-black m-2 p-1 w-72'
          onChange={handleSearchChange}
        />
      </div>

      {showAlert && <Alert type={alertType} message={alertMessage} />}

      <button
        className="hover:underline bg-cyan-500 text-white px-4 py-2 m-2 rounded"
        onClick={() => window.location.href = `/api/tables/matricula?format=xlsx`}
      >
        Descargar el reporte en XLSX
      </button>

      {showModal ? (
        <div className="flex bg-slate-900 fixed justify-center flex-col items-center top-0 left-0 h-screen w-full z-50 bg-opacity-70">
          <div className="mt-10 px-12 bg-white justify-center items-center flex-col w-96 rounded-lg shadow-xl h-auto p-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input id="nombre" name="nombre" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="p-1 mt-1 block w-full border-gray-600 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input id="apellido" name="apellido" type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)} className="p-1 mt-1 block w-full border-gray-600 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">Cédula</label>
                <input id="cedula" name="cedula" type="text" required value={cedula} onChange={(e) => setCedula(e.target.value)} className="p-1 mt-1 block w-full border-gray-600 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input id="telefono" name="telefono" type="text" required value={telefonos} onChange={(e) => setTelefonos(e.target.value)} className="p-1 mt-1 block w-full border-gray-600 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="curso" className="block text-sm font-medium text-gray-700">Curso</label>
                <select id="curso" name="curso" required value={curso} onChange={(e) => setCurso(e.target.value)} className="p-1 mt-1 block w-full border-gray-600 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option disabled value="">Selecciona un curso</option>
                  <option value="Escolta">Escolta</option>
                  <option value="OMT">OMT</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Vigilancia">Vigilancia</option>
                </select>
              </div>
              <div>
                <label htmlFor="libreta_militar" className="block text-sm font-medium text-gray-700">Libreta Militar</label>
                <select id="libreta_militar" name="libreta_militar" required value={libretamilitar} onChange={(e) => setLibretaMilitar(e.target.value)} className="p-1 mt-1 block w-full border-gray-600 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option disabled value="">¿Tienes libreta militar?</option>
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="certificado" className="block text-sm font-medium text-gray-700">Certificado</label>
                <select id="certificado" name="certificado" required value={certificados} onChange={(e) => setCertificados(e.target.value)} className="p-1 mt-1 block w-full border-gray-600 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option disabled value="">Selecciona un certificado</option>
                  <option value="Bachiller">Bachiller</option>
                  <option value="Universitario">Universitario</option>
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="m-6 w-auto px-8 h-10 bg-green-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
                >Actualizar</button>

                <button
                  className="m-6 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
                  onClick={() => setShowModal(false)}
                >Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {showConfirmation ? (
        <div className="flex bg-slate-900 fixed justify-center flex-col items-center top-0 left-0 h-screen w-full z-50 bg-opacity-70">
          <div className="mt-10 px-12 bg-white fixed justify-center flex-col items-center w-auto rounded-lg shadow-xl h-auto p-2">
            <p className='font-bold m-5'>¿Esta seguro que desea eliminar la matricula?</p>
            <button
              className="m-6 px-8 h-10 bg-red-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
              onClick={() => {
                setShowConfirmation(false);
                btnEliminar();
              }}
            >Eliminar</button>
            <button
              className="m-6 px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
              onClick={() => setShowConfirmation(false)}
            >Cancelar</button>
          </div>
        </div>
      ) : null}

      {filteredMatriculas.map((item, index) => {
        return (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto mb-10">
            <div className="px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Matricula</h2>
              <p className="text-sm text-gray-600 mb-2">Nombre: {item.nombre} </p>
              <p className="text-sm text-gray-600 mb-2">Apellido: {item.apellido} </p>
              <p className="text-sm text-gray-600 mb-2">Cédula: {item.cedula}</p>
              <p className="text-sm text-gray-600 mb-2">Correo: {item.correo}</p>
              <p className="text-sm text-gray-600 mb-2">Curso: {item.curso}</p>
              <p className="text-sm text-gray-600 mb-2">Libreta Militar: {item.libretamilitar}</p>
              <p className="text-sm text-gray-600 mb-2">Certificados: {item.certificados}</p>
            </div>
            <div className="flex justify-between px-6 py-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md mr-4"
                onClick={() => {
                  btnActualizar(item);
                }}
              >Actualizar</button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => {
                  setShowConfirmation(true);
                  seleccionarMatricula(item);
                }}
              >Borrar</button>
              {/* Mostrar el estado según la condición */}
              {status === 'approved' && <p className="text-green-500">Actualizar</p>}
              {status === 'rejected' && <p className="text-red-500">Borrar</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AuxiliarPage
