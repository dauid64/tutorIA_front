import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';
import TutorIAAPI from '$lib/api';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authorizationHandle: Handle = (async ({ event, resolve }) => {
    if (event.route.id?.includes("member")) {
        const session = await event.cookies.get("auth-login")
        if (!session) {
            throw redirect(303, "/login")
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
    
    event.locals.tutorIAAPI = new TutorIAAPI(tutorIABackEndURL)

    return resolve(event)
})

export const handle = sequence(
    handleTutorIAClient,
    authorizationHandle,
);