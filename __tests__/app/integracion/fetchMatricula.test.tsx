import { neon } from '@neondatabase/serverless';
import { fetchMatricula, fetchStudent, fetchUser, getMatriculas } from '../../../app/lib/actions';

describe('fetchMatricula', () => {

    it('should fetch matricula by idalumno', async () => {
        if (!process.env.DATABASE_URL)
            throw new Error("DATABASE_URL no está definida en las variables de entorno");
        const sql = neon(process.env.DATABASE_URL);

        // Inserta datos de prueba en la base de datos
        await sql`
            INSERT INTO matricula(id, idalumno, idcurso, isactivo) 
            VALUES (333, '159487', '3', true)
        `;

        const result = await fetchMatricula('159487');
        expect(result).toEqual({
            id: "333",
            idalumno: 159487,
            idcurso: 3,
            isactivo: true,
        });
    });

    it('should return default object if idalumno is undefined', async () => {
        const result = await fetchMatricula(undefined);
        expect(result).toEqual({
            id: '',
            idalumno: '',
            idcurso: '',
            isactivo: '',
        });
    });

    it('should return an list with length "10"', async () => {
        const result = await getMatriculas();
        expect(result.length).toEqual(10);
    });
});
