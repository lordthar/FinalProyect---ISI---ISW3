"use client";

import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <div>
    <nav className="flex items-center justify-between bg-gray-200 py-4 shadow-lg mb-10">
      <div className="flex items-center ml-6">
        <a href="#">
          <Image src="/ISI.png" height={50} width={100} alt="isi image" />
        </a>
      </div>
  
      <div className="mr-6">
        <Link href="/loginAlum">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-4 focus:outline-none focus:ring focus:ring-blue-200">
            Accede Alumno
          </button>
        </Link>
  
        <Link href="/matricula">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-4 focus:outline-none focus:ring focus:ring-blue-200">
           Matriculate en ISI
          </button>
        </Link>
  
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
            ¿Eres Auxiliar?
          </button>
        </Link>
      </div>
    </nav>
  </div>
  

  );
}

export default Navbar;
