import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Recruiter Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'recruiter@devfind.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Recruiter demo credentials authentication
        if (!credentials?.email) {
          return null;
        }

        // Accept any recruiter email in demo mode or standard demo password
        return {
          id: 'recruiter-1',
          name: credentials.email.split('@')[0] || 'Recruiter',
          email: credentials.email,
          image: 'https://avatars.githubusercontent.com/u/9919?v=4',
        };
      },
    }),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'devfind-secret-key-super-secure-change-in-prod-12345',
};
