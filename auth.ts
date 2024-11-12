
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { fetchUser } from './app/lib/actions';
 
async function getUser(value: string): Promise<User | undefined> {
  try {
    const user= await fetchUser(value)
    return user;
    
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
      async authorize(credentials) {
          const parsedCredentials = z
              .object({ username: z.string().min(3), password: z.string().min(3) })
              .safeParse(credentials)

          if (parsedCredentials.success) {
              const { username, password } = parsedCredentials.data
              const user = await getUser(username)
              if (!user) return null

              if (password===user.password) return user
          }
          return null
      }
  })]
})