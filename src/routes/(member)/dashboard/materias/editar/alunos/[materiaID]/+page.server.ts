import type TutorIAAPI from "$lib/api"
import type { Aluno } from "$lib/server/models/aluno"
import { handleAPIError } from "$lib/utils/tutorIAAPIError"
import { fail } from "@sveltejs/kit"
import { setFlash } from "sveltekit-flash-message/server"

export const load = ( async ({ params, locals, cookies }) => {
    const materiaID = params.materiaID
    const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

    const responseAlunosRegistered = await tutorIAAPI.fetchWrapper(
        `materia/${materiaID}/alunos/registered`,
        {
            method: 'GET'
        }
    )

    if (!responseAlunosRegistered.ok) {
        return await handleAPIError(cookies, responseAlunosRegistered, 'Não foi possível encontrar os alunos cadastrados.')
    }

    const dataAlunosRegistered = await responseAlunosRegistered.json()

    const responseAlunosNotRegistered = await tutorIAAPI.fetchWrapper(
        `materia/${materiaID}/alunos/not-registered`,
        {
            method: 'GET'
        }
    )

    if (!responseAlunosNotRegistered.ok) {
        return await handleAPIError(cookies, responseAlunosNotRegistered, 'Não foi possível encontrar os alunos não cadastrados.')
    }

    const dataAlunosNotRegistered = await responseAlunosNotRegistered.json()

    return {
        'alunosRegistered': dataAlunosRegistered.result.alunos_registered as Aluno[],
        'alunosNotRegistered': dataAlunosNotRegistered.result.alunos_not_registered as Aluno[]
    }
})

export const actions = {
    registerAluno: async ({ params, locals, cookies, request }) => {
        const data = await request.formData();

        const alunoID = data.get("alunoID")
        const materiaID = params.materiaID
        const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

        const response = await tutorIAAPI.fetchWrapper(
            `materia/aluno/add`,
            {
                method: 'POST',
                body: {
                    "materia_id": materiaID,
                    "aluno_id": alunoID
                }
            }
        )

        if (!response.ok) {
            return await handleAPIError(cookies, response, 'Não foi possível cadastrar o aluno na matéria.')
        }

        setFlash({ type: 'success', message: 'Aluno cadastrado na matéria.'}, cookies)
        return
    },
    unregisterAluno: async ({ params, locals, cookies, request }) => {
        const data = await request.formData();

        const alunoID = data.get("alunoID")
        const materiaID = params.materiaID
        const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

        const response = await tutorIAAPI.fetchWrapper(
            `materia/aluno/remove`,
            {
                method: 'POST',
                body: {
                    "materia_id": materiaID,
                    "aluno_id": alunoID
                }
            }
        )

        if (!response.ok) {
            return await handleAPIError(cookies, response, 'Não foi possível descadastrar o aluno na matéria.')
        }

        setFlash({ type: 'success', message: 'Aluno descadastrado da matéria.'}, cookies)
        return
    }
}