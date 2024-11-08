"use server"

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import postgres from 'postgres';

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


const conn = postgres({
  host: '192.168.100.65',
  database: 'isidatabase',
  username: 'postgres',
  password: 'example',
  port: 5432,
  ssl: false,
});

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

export const createProspect = async (data: Matricula) => {
  const { id, nombre, apellido, cedula, telefonos, correo, curso, libretamilitar: libretaMilitar, certificados, fotousuario: fotoUsuario } = data
  try {
    const query = await conn.begin(async conn => {
      await conn`
      INSERT INTO matricula(id, nombre, apellido, correo, cedula, telefonos, curso, libretaMilitar, certificados, fotoUsuario)
      VALUES (${id}, ${nombre}, ${apellido}, ${correo}, ${cedula}, ${telefonos}, ${curso}, ${libretaMilitar}, ${certificados}, ${fotoUsuario});`
      return true
    })

    return query
  } catch (error) {
    throw error
  }
}

export const updateProspect = async (data: Matricula) => {
  const { id, nombre, apellido, cedula, telefonos, correo, curso, libretamilitar, certificados, fotousuario } = data
  try {
    const query = await conn.begin(async conn => {
      await conn`
      UPDATE matricula
        SET nombre = ${nombre}, 
        apellido = ${apellido}, 
        cedula = ${cedula}, 
        telefonos = ${telefonos}, 
        correo = ${correo}, 
        curso = ${curso}, 
        libretaMilitar = ${libretamilitar}, 
        certificados = ${certificados}, 
        fotoUsuario = ${fotousuario}
      WHERE id  = ${id};`

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
  const matriculas: Matricula[] = await conn`SELECT * FROM Matricula;`
  return matriculas;
}

export async function getSolicitudes() {
  const solicitudes = await conn`SELECT * FROM solicitudes`
  return solicitudes;
}

export async function getUsuarios() {
  const solicitudes = await conn`SELECT * FROM usuarios`
  return solicitudes;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    console.log(error);
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