import Navbar from "@/app/components/Navbar";

function HomePage() {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen py-12">
    <Navbar />
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Matricúlate en el Instituto de Seguridad Integral
      </h1>
      <p className="text-lg text-center mb-8">
        Elige entre una variedad de cursos y aprende de profesionales dedicados a apoyarte en todo momento.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Curso 1: Escolta */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Escolta</h2>
          <p className="text-gray-700 mb-4">
            Prepárate para proteger y escoltar personas importantes con habilidades tácticas y de defensa personal.
          </p>
        </div>
  
        {/* Curso 2: OMT */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">OMT</h2>
          <p className="text-gray-700 mb-4">
            Formación en Operaciones de Mantenimiento de la Tranquilidad, enfocado en la gestión y resolución de conflictos.
          </p>
        </div>
  
        {/* Curso 3: Supervisor */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Supervisor</h2>
          <p className="text-gray-700 mb-4">
            Desarrolla tus habilidades de liderazgo y gestión para supervisar equipos de seguridad con eficacia.
          </p>
        </div>
  
        {/* Curso 4: Vigilancia */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Vigilancia</h2>
          <p className="text-gray-700 mb-4">
            Aprende técnicas avanzadas de vigilancia y monitoreo para asegurar la protección de bienes y personas.
          </p>
        </div>
      </div>
  
      <div className="mt-12 text-center">
        <div className="rounded-lg shadow-lg bg-white p-8">
          <h2 className="text-2xl font-bold mb-4">Nuestro Compromiso</h2>
          <p className="text-lg mb-8 text-gray-700">
            En el Instituto de Seguridad Integral, nos comprometemos a ofrecerte la mejor experiencia educativa con materiales de alta calidad y apoyo constante de nuestros profesionales. ¡Únete a nosotros y dale un impulso a tu carrera en seguridad!
          </p>
  
          <h2 className="text-2xl font-bold mb-4">Nuestra Visión</h2>
          <p className="text-lg mb-8 text-gray-700">
            Nos esforzamos por ser líderes en la educación en seguridad, brindando herramientas innovadoras y formación de primera clase. Queremos ser reconocidos como la opción número uno para quienes buscan una carrera en seguridad.
          </p>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default HomePage;
