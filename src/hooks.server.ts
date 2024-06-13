import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';
import TutorIAAPI from '$lib/api';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from "./auth";


const protectedHandle: Handle = (async ({ event, resolve }) => {
    if (event.route.id?.includes("member")) {
        const session = await event.locals.getSession();
		if (!session) {
			redirect(303, '/login');
		}
        const tutorIAAPI = event.locals.tutorIAAPI as TutorIAAPI

        const response = await tutorIAAPI.fetchWrapper("validate",
            {
                method: 'GET'
            }
        )

        const data = await response.json()

        if (!response.ok && data.error.message == "NO_AUTH") {
            redirect(303, '/login');
        }
    }

    return resolve(event)
})

const handleTutorIAClient: Handle = (async ({ event, resolve }) => {
    let tutorIABackEndURL = "";

    if (dev) {
        tutorIABackEndURL = env.PUBLIC_TUTORIA_BACKEND_URL as string
    } else {
        tutorIABackEndURL = "https://tutorIA/api/"
    }

    const session = await event.locals.getSession()
    if (session) {
        event.locals.tutorIAAPI = new TutorIAAPI(
            tutorIABackEndURL,
            session.accessToken
        )
    }
    if (!session) {
        event.locals.tutorIAAPI = new TutorIAAPI(tutorIABackEndURL)
    }

    return resolve(event)
})

export const handle = sequence(
    authHandle,
    handleTutorIAClient,
    protectedHandle,
);