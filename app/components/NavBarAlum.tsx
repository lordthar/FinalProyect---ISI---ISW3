import { cookies } from "next/headers";
import { fetchStudent, getStudent } from "../lib/actions";

const NavBarAlum = async () => {
  const cookiesAlumno = cookies()
  const idAlumno = cookiesAlumno.get("idestudiante")
  const alumno = await getStudent(idAlumno?.value);
  

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-zinc-300 to-blue-500 py-4 shadow-lg mb-10">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center">
          <img src="/ISI.png" alt="Logo de la empresa" className="h-10 mr-2" />
          <span className="text-white text-2xl font-bold">ISI</span>
        </div>
        <div className="text-center">
          <p className="text-white text-xl font-semibold">Home de {alumno?.nombre}</p>
        </div>
        {(
          <div className="text-center">
            <p className="text-white text-xl font-semibold">Bienvenido </p>
          </div>
        )}
      </div>
    </nav>
  )
};

export default NavBarAlum;
