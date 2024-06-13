import type TutorIAAPI from "$lib/api"
import type { Aluno } from "$lib/server/models/aluno"
import { handleAPIError } from "$lib/utils/tutorIAAPIError"
import { fail } from "@sveltejs/kit"
import { setFlash } from "sveltekit-flash-message/server"

export const load = ( async ({ locals, cookies }) => {
    const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

    const response = await tutorIAAPI.fetchWrapper(
        'aluno',
        {
            method: 'GET'
        }
    )

    if (!response.ok) {
        return await handleAPIError(cookies, response, 'Não foi possível encontrar os alunos.')
    }

    const data = await response.json()

    return { 
        'alunos': data.result.alunos as Aluno[]
    }
})