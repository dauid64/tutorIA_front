import type TutorIAAPI from "$lib/api"
import type { Materia } from "$lib/server/models/materia"
import { fail } from "@sveltejs/kit"
import { setFlash } from "sveltekit-flash-message/server"

export const load = ( async ({ locals, cookies }) => {
    const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

    const response = await tutorIAAPI.fetchWrapper(
        'materia',
        {
            method: 'GET'
        }
    )

    if (response.error) {
        setFlash({ type: 'error', message: 'Não foi possível encontrar as matérias.'}, cookies)
        return fail(400)
    }

    const data = await response.json()

    return { 
        'materias': data.result.materias as Materia[]
    }
})