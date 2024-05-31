import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';
import TutorIAAPI from '$lib/api';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';


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
    handleTutorIAClient
);