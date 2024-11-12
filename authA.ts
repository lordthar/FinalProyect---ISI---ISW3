
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authaConfig } from './autha.config';
import { z } from 'zod';
import { fetchStudent } from './app/lib/actions';
 
async function getStudent(value: string): Promise<Student | undefined> {
  try {
    const user= await fetchStudent(value)    
    return user;
    
  } catch (error) {
    //throw new Error('Failed to fetch student.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authaConfig,
  providers: [Credentials({
      async authorize(credentials) {
          const parsedCredentials = z
              .object({ username: z.string().min(2), password: z.string().min(2) })
              .safeParse(credentials)

          if (parsedCredentials.success) {
              const { username, password } = parsedCredentials.data
              const student = await getStudent(username)

              if (!student) return null

              if (password===student.password) return student;
          }
          return null
      }
  })]
})