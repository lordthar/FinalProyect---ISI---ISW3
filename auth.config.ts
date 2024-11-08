import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login', 
  },
  
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl) || url.startsWith('/')) {
        return `${baseUrl}/auxiliarAdministrativo`;
      }
      return baseUrl;
    },

    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; 
      const isOnDashboard = nextUrl.pathname.startsWith('/auxiliarAdministrativo');
      
      if (isOnDashboard && !isLoggedIn) {
        return false;
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;