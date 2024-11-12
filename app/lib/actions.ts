"use server"

import { signIn } from '@/auth';
import { signIn as signInA} from '@/authA';
import { AuthError } from 'next-auth';
import postgres from 'postgres';
import { cookies } from 'next/headers';

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


const conn = postgres({
  host: 'ep-late-darkness-a5szvtrq.us-east-2.aws.neon.tech',
  database: 'ISI-database',
  username: 'ISI-database_owner',
  password:'8K3pQqFaeRIh',
  port: 5432,
  ssl: false,
});

export async function fetchMatricula(idalumno: string | undefined) {
  if (idalumno === undefined) return {
    id: '',
    idalumno: '',
    idcurso: '' 
  };
  
  const [matricula] = await conn`select * from matricula where idalumno=${idalumno}`
  const userObject = {
    id: matricula.id,
    idalumno: matricula.idalumno,
    idcurso: matricula.idcurso
  }
  return userObject;
}

export async function fetchUser(username: string) {
  const [user] = await conn`select * from usuarios where username=${username}`
  const userObject = {
    id: user.id,
    nombre: user.nombre,
    username: user.username,
    password: user.password
  }
  return userObject;
}

export async function fetchStudent(name: string) {
  const [user] = await conn`select * from alumno where correo=${name}`
  const studentObject = {
    id: user.idalumno,
    nombre: user.nombre,
    username: user.correo,
    password: user.password
  }

  const coockieStore = cookies()
  coockieStore.set("idestudiante", studentObject.id, {
    httpOnly: true
  })

  return studentObject;
}

export const createProspect = async (data: Matricula) => {
  const { id, nombre, apellido, cedula, telefonos, correo, password, curso, libretamilitar, certificados } = data
  const idmatricula = Date.now();
  try {
    const query = await conn.begin(async conn => {
      
      await conn`
        INSERT INTO alumno(idalumno, nombre, apellido, password, correo, cedula, telefonos, libretaMilitar, certificados)
        VALUES (${cedula}, ${nombre}, ${apellido}, ${password}, ${correo}, ${cedula}, ${telefonos}, ${libretamilitar}, ${certificados});`

      const idcurso = (await conn`
        SELECT codigo FROM curso WHERE nombre = ${curso};`)[0].codigo


      await conn`
        INSERT INTO matricula(id, idalumno, idcurso)
        VALUES (${idmatricula}, ${cedula}, ${idcurso});`
    })
    
    return query
  } catch (error) {
    throw error
  }
}

export const updateProspect = async (data: Matricula) => {
  const { id, nombre, apellido, cedula, telefonos, correo, password, curso, libretamilitar, certificados } = data
  try {
    const query = await conn.begin(async conn => {
      const matricula = await conn`
      SELECT * FROM matricula WHERE id  = ${id};`
      
      await conn`
      UPDATE alumno
        SET nombre = ${nombre}, 
        apellido = ${apellido}, 
        cedula = ${cedula}, 
        telefonos = ${telefonos}, 
        correo = ${correo},
        password = ${password},
        libretaMilitar = ${libretamilitar}, 
        certificados = ${certificados}
      WHERE idalumno = ${matricula[0].idalumno}`

      const idcurso = (await conn`
        SELECT codigo FROM curso WHERE nombre = ${curso};`)[0].codigo

      await conn`
        UPDATE matricula
          SET idcurso = ${idcurso}
        WHERE id = ${id}`

      return true
    })
    return query
  } catch (error) {
    throw error
  }
}

export const eliminarProspect = async (data: string) => {
  const id = data;
  try {
    const query = await conn.begin(async conn => {
      await conn`
      DELETE FROM matricula 
      where id = ${id};
    `;
      return true;
    })
    return query
  } catch (error) {
    throw error
  }
}

export const createProspectSolicitud = async (data: Solicitud) => {
  const { id, titulo, correo, descripcion } = data;
  try {
    const query = await conn.begin(async conn => {
      await conn`
      INSERT INTO solicitudes(id, titulo, correo, descripcion)
      VALUES (${id}, ${titulo}, ${correo}, ${descripcion});
    `;
      return true;
    })
    return query
  } catch (error) {
    throw error
  }
}

export async function getMatriculas() {
  const matriculas: Matricula[] = await conn`
    SELECT m.id, a.nombre, a.apellido, a.cedula, a.telefonos, a.correo, c.nombre AS curso, a.libretamilitar, a.certificados 
    FROM matricula m
    JOIN alumno a on a.idalumno = m.idalumno
    JOIN curso c on c.codigo = m.idcurso;`
  return matriculas;
}

export async function getSolicitudes() {
  const solicitudes = await conn`SELECT * FROM solicitudes`
  return solicitudes;
}

export async function getUsuarios() {
  const usuarios = await conn`SELECT * FROM usuarios`
  return usuarios;
}

export async function getHorario(codigoCurso: string) {
  const horario = await conn`
  SELECT dh.dia, dh.horainicio, dh.horafin, h."fechaInicio", h."fechaFin", c.nombre FROM detallehorario dh
  JOIN horario h ON dh.idhorario = h.idhorario
  JOIN curso c ON h.idcurso = c.codigo
  WHERE c.codigo = ${codigoCurso}`;
  return horario;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function authenticateStudent(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signInA('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}