import type TutorIAAPI from "$lib/api"
import type { Materia } from "$lib/server/models/materia"
import { handleAPIError } from "$lib/utils/tutorIAAPIError"

export const load = ( async ({ locals, cookies }) => {
    const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

    const response = await tutorIAAPI.fetchWrapper(
        'materia',
        {
            method: 'GET'
        }
    )

    if (!response.ok) {
        return await handleAPIError(cookies, response, 'Não foi possível encontrar as matérias.')
    }

    const data = await response.json()

    return { 
        'materias': data.result.materias as Materia[]
    }
})