
import React from 'react';
import { fetchMatricula, getHorario } from '../lib/actions';
import { cookies } from 'next/headers';

interface ScheduleItem {
  day: string;
  time: string;
  subject: string;
}

interface ScheduleProps {
  schedule: ScheduleItem[];
}

const Schedule: React.FC<ScheduleProps> = async ({ schedule }) => {
  const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  const horas = ['07:00:00', '09:00:00', '10:00:00', '11:00:00', '13:00:00', '15:00:00'];

  const cookieStore = cookies()
  const idEstudiante = cookieStore.get("idestudiante")

  const matricula = await fetchMatricula(idEstudiante?.value)  

  const horario = await getHorario(matricula.idcurso)

  return (
    <div className="container mx-auto p-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">

          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-indigo-500 p-4">HORAS</th>
              <th className="border border-indigo-500 p-4">LUNES</th>
              <th className="border border-indigo-500 p-4">MARTES</th>
              <th className="border border-indigo-500 p-4">MIERCOLES</th>
              <th className="border border-indigo-500 p-4">JUEVES</th>
              <th className="border border-indigo-500 p-4">VIERNES</th>
              <th className="border border-indigo-500 p-4">SÁBADO</th>
              <th className="border border-indigo-500 p-4">DOMINGO</th>
            </tr>
          </thead>


          <tbody>
            {horas.map((hora, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-gray-100 even:bg-white text-gray-700">
                <td className="border border-gray-300 p-4 text-center font-semibold bg-indigo-100">{hora}</td>
                {dias.map((dia, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 p-4">
                    {horario.map((item, index) => (
                      <div key={index}>
                        {dia == item.dia && horas[rowIndex] == item.horainicio
                          ? (
                            <div>
                              <div className="text-indigo-700 font-semibold">Cod. {item.id}</div>
                              <div>{item.nombre}</div>
                              <div className="text-sm text-gray-500">Grupo: {item.grupo}</div>
                              <div className="text-sm text-gray-500">{item.fechaInicio.toLocaleDateString()} - {item.fechaFin.toLocaleDateString()}</div>
                              <div className="text-sm text-gray-600">Aula: {item.aula}</div>
                              <div className="text-sm text-gray-600">Hora inico: {item.horainicio}</div>
                            </div>
                          ) : null
                        }
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
