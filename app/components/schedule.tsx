

import React from 'react';

interface ScheduleItem {
  day: string;
  time: string;
  subject: string;
}

interface ScheduleProps {
  schedule: ScheduleItem[];
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  
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
          <tr className="odd:bg-gray-100 even:bg-white text-gray-700">
            <td className="border border-gray-300 p-4 text-center font-semibold bg-indigo-100">7:00 am</td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12340</div>
              <div>ADMINISTRACIÓN DE INFRAESTRUCTURA DE TI</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">08/08/24 - 28/11/24</div>
              <div className="text-sm text-gray-600">Aula: D4-403 AULA</div>
            </td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12338</div>
              <div>BASES DE DATOS II</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">06/08/24 - 26/11/24</div>
              <div className="text-sm text-gray-600">Aula: D4-403</div>
            </td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12339</div>
              <div>INGENIERÍA DE SOFTWARE III</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">07/08/24 - 27/11/24</div>
              <div className="text-sm text-gray-600">Aula: D4-302</div>
            </td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12335</div>
              <div>INGENIERÍA ECONÓMICA</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">08/08/24 - 28/11/24</div>
              <div className="text-sm text-gray-600">Lab: D4-Laboratorio</div>
            </td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12336</div>
              <div>FUNDAMENTOS DE HCI</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">09/08/24 - 29/11/24</div>
              <div className="text-sm text-gray-600">Lab: D4-Laboratorio</div>
            </td>
            <td className="border border-gray-300 p-4 text-center text-gray-400">-</td>
            <td className="border border-gray-300 p-4 text-center text-gray-400">-</td>
          </tr>

          <tr className="odd:bg-gray-100 even:bg-white text-gray-700">
            <td className="border border-gray-300 p-4 text-center font-semibold bg-indigo-100">9:00 am</td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12339</div>
              <div>INGENIERÍA DE SOFTWARE III</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">05/08/24 - 25/11/24</div>
              <div className="text-sm text-gray-600">Aula: F4-SALA M</div>
            </td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12337</div>
              <div>SEMINARIO DE INVESTIGACIÓN</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">06/08/24 - 26/11/24</div>
              <div className="text-sm text-gray-600">Aula: D4-302</div>
            </td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12336</div>
              <div>FUNDAMENTOS DE HCI</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">07/08/24 - 27/11/24</div>
              <div className="text-sm text-gray-600">Aula: D4-413</div>
            </td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12340</div>
              <div>ADMINISTRACIÓN DE INFRAESTRUCTURA DE TI</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">08/08/24 - 28/11/24</div>
              <div className="text-sm text-gray-600">Aula: D4-403</div>
            </td>
            <td className="border border-gray-300 p-4">
              <div className="text-indigo-700 font-semibold">Cod. 12338</div>
              <div>BASES DE DATOS II</div>
              <div className="text-sm text-gray-500">Grupo: 01D SubGrupo.</div>
              <div className="text-sm text-gray-500">08/08/24 - 29/11/24</div>
              <div className="text-sm text-gray-600">Aula: D4-317</div>
            </td>
            <td className="border border-gray-300 p-4 text-center text-gray-400">-</td>
            <td className="border border-gray-300 p-4 text-center text-gray-400">-</td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Schedule;
