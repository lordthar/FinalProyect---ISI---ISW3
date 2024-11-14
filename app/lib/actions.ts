"use server"

import { signIn } from '@/auth';
import { signIn as signInA } from '@/authA';
import { AuthError } from 'next-auth';
import { cookies } from 'next/headers';
import { neon } from "@neondatabase/serverless";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


export async function getData() {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const data = await sql`...`;
  return data;
}

export async function fetchMatricula(idalumno: string | undefined) {
  if (idalumno === undefined) return {
    id: '',
    idalumno: '',
    idcurso: '',
    isactivo: ''
  };

  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const [matricula] = await sql`select * from matricula where idalumno=${idalumno}`
  const userObject = {
    id: matricula.id,
    idalumno: matricula.idalumno,
    idcurso: matricula.idcurso,
    isactivo: matricula.isactivo
  }
  return userObject;
}

export async function fetchUser(username: string) {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const [user] = await sql`select * from usuarios where username=${username}`
  const userObject = {
    id: user.id,
    nombre: user.nombre,
    username: user.username,
    password: user.password
  }

  const cookieStore = cookies()
  cookieStore.set("userUsername", user.username, {
    httpOnly: true
  })

  return userObject;
}

export async function fetchStudent(correo: string | undefined) {
  if (correo === undefined) return {
    id: '',
    nombre: '',
    username: '',
    password: ''
  };

  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const [user] = await sql`
    select * from alumno a
      JOIN matricula m ON a.idalumno = m.idalumno 
    where a.correo=${correo} AND m.isactivo = true;
  `
  const studentObject = {
    id: user.idalumno,
    nombre: user.nombre,
    username: user.correo,
    password: user.password
  }

  const cookieStore = cookies()
  cookieStore.set("idestudiante", studentObject.id, {
    httpOnly: true
  })

  return studentObject;
}

export const createProspect = async (data: Matricula) => {
  const { id, nombre, apellido, cedula, telefonos, correo, password, curso, libretamilitar, certificados, isactivo } = data
  const idmatricula = Date.now();
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  try {

    await sql`
    WITH nuevo_alumno AS (
        INSERT INTO alumno(idalumno, nombre, apellido, password, correo, cedula, telefonos, libretaMilitar, certificados)
        VALUES (${cedula}, ${nombre}, ${apellido}, ${password}, ${correo}, ${cedula}, ${telefonos}, ${libretamilitar}, ${certificados})
        RETURNING idalumno
    )
    INSERT INTO matricula(id, idalumno, idcurso, isactivo)
    VALUES (
        ${idmatricula},
        (SELECT idalumno FROM nuevo_alumno),
        (SELECT codigo FROM curso WHERE nombre = ${curso}),
        ${isactivo}
    );`

    return true
  } catch (error: any) {
    if (error.message.includes("duplicate key value")) {
      throw new Error("El alumno ya existe en la base de datos.");
    }
    throw error
  }
}

export const updateProspect = async (data: Matricula) => {
  const { id, nombre, apellido, cedula, telefonos, correo, password, curso, libretamilitar, certificados, isactivo } = data
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  try {

    const matricula = await sql`
      SELECT * FROM matricula WHERE id  = ${id};`

    await sql`
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

    const idcurso = (await sql`
        SELECT codigo FROM curso WHERE nombre = ${curso};`)[0].codigo

    await sql`
        UPDATE matricula
          SET idcurso = ${idcurso},
          isactivo = ${isactivo}
        WHERE id = ${id}`

    return true
  } catch (error) {
    throw error
  }
}

export const eliminarProspect = async (data: string) => {
  const id = data;
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  try {

    await sql`
      UPDATE matricula
          SET isactivo = false 
      where id = ${id};
    `;

    return true
  } catch (error) {
    throw error
  }
}

export const createProspectSolicitud = async (data: Solicitud) => {
  const { id, titulo, correo, descripcion } = data;
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  try {
    await sql`
      INSERT INTO solicitudes(id, titulo, correo, descripcion)
      VALUES (${id}, ${titulo}, ${correo}, ${descripcion});
    `;

    return true
  } catch (error) {
    throw error
  }
}

export async function getMatriculas() {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const matriculas = await sql`
    SELECT m.id, a.nombre, a.apellido, a.cedula, a.password, a.telefonos, a.correo, c.nombre AS curso, a.libretamilitar, a.certificados, m.isactivo 
    FROM matricula m
      JOIN alumno a on a.idalumno = m.idalumno
      JOIN curso c on c.codigo = m.idcurso
    WHERE m.isactivo = true;`
  return matriculas;
}

export async function getInforme() {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const informe = await sql`SELECT * FROM informe;`
  return informe;
}

export async function getSolicitudes() {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const solicitudes = await sql`SELECT * FROM solicitudes`
  return solicitudes;
}

export async function getUsuarios() {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const usuarios = await sql`SELECT * FROM usuarios`
  return usuarios;
}

export async function getUser(username: string | undefined) {
  if (username === undefined) return;
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const usuarios = await sql`SELECT * FROM usuarios WHERE username = ${username}`;

  return usuarios[0]; // Retorna el primer y único resultado
}

export async function getStudent(id: string | undefined) {
  if (id === undefined) return;
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const usuarios = await sql`SELECT * FROM alumno WHERE idalumno = ${id}`;

  return usuarios[0]; // Retorna el primer y único resultado
}


export async function getHorario(codigoCurso: string) {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL no está definida en las variables de entorno");

  const sql = neon(process.env.DATABASE_URL);
  const horario = await sql`
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