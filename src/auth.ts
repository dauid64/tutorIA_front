import { dev } from "$app/environment";
import { env as env_private } from "$env/dynamic/private";
import { env as env_public } from '$env/dynamic/public';
import TutorIAAPI from '$lib/api';
import { SvelteKitAuth } from "@auth/sveltekit";
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
                        return null
                    }
                },
            })
        ],
        secret: env_private.TUTORIA_SECRET_AUTH as string,
        async redirect({url, baseURL}) {
            if (url.includes('logout')) return '/';
            if (url.includes('login')) return '/';
            return baseURL;
        },
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.user_id = user.result.user_id
                    token.accessToken = user.result.jwt
                }
                return token
            },
            session: async ({ session, token, user }) => {
                session.user.id = token.user_id
                session.accessToken = token.accessToken
                return session
            },
          },
    }
    return authOptions
})