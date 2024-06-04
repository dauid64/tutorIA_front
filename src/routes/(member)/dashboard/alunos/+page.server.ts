import type TutorIAAPI from "$lib/api"
import type { Aluno } from "$lib/server/models/aluno"
import { fail } from "@sveltejs/kit"
import { setFlash } from "sveltekit-flash-message/server"

export const load = ( async ({ locals, cookies }) => {
    const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

    const responseReadAlunosData = await tutorIAAPI.fetchWrapper(
        'aluno',
        {
            method: 'GET'
        }
    )

    if (responseReadAlunosData.error) {
        setFlash({ type: 'error', message: 'Não foi possível encontrar os alunos.'}, cookies)
        return fail(400)
    }

    return { 
        'alunos': responseReadAlunosData.alunos as Aluno[]
    }
})