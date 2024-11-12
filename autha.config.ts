import type { NextAuthConfig } from 'next-auth';
 
export const authaConfig = {
  pages: {
    signIn: '/loginAlumn', 
  },
  
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl) || url.startsWith('/')) {
        return `${baseUrl}/HomeUser`;
      }
      return baseUrl;
    },

    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; 
      const isOnDashboard = nextUrl.pathname.startsWith('/HomeUser');
      
      if (isOnDashboard && !isLoggedIn) {
        return false;
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;