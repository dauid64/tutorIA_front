import { dev } from "$app/environment";
import { env as env_private } from "$env/dynamic/private";
import { env as env_public } from '$env/dynamic/public';
import TutorIAAPI from '$lib/api';
import { CredentialsSignin, SvelteKitAuth } from "@auth/sveltekit";
import Credentials from "@auth/sveltekit/providers/credentials"

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
    const authOptions =  {
        providers: [
            Credentials({
                credentials: {
                    username: { label: "Username" },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials, req) {
                    let tutorIABackEndURL = "";

                    if (dev) {
                        tutorIABackEndURL = env_public.PUBLIC_TUTORIA_BACKEND_URL as string
                    } else {
                        tutorIABackEndURL = "https://tutorIA/api/"
                    }

                    event.locals.tutorIAAPI = new TutorIAAPI(tutorIABackEndURL)
                    const tutorIAAPI = event.locals.tutorIAAPI as TutorIAAPI

                    const response = await tutorIAAPI.fetchWrapper("login", {
                        method: "POST",
                        body: {
                            "username": credentials.username,
                            "pwd": credentials.password
                        }
                    })

                    if (response.ok) {
                        return await response.json()
                    } else {
                        throw new Error("User not found.")
                    }
                },
            })
        ],
        pages: {
			signIn: '/login',
			error: '/login',
			// signOut: '/login'
		},
        secret: env_private.TUTORIA_SECRET_AUTH as string,
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.user_id = user.result.user_id
                    token.accessToken = user.result.jwt
                }
                return token
            },
            async session ({ session, token, user }) {
                session.user.id = token.user_id
                session.accessToken = token.accessToken
                return session
            },
            async redirect({ url, baseUrl }) {
                if (url.includes('login')) return `/dashboard`;
                if (url.includes('logout')) return '/';
                return "/";
            }
          }
    }
    return authOptions
})