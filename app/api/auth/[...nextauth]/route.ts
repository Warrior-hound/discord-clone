import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { redirect } from 'next/navigation'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    debug: false,
    callbacks: {
        signIn() {
			return true
        },
        async  redirect() {
			return `/`
		}
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }