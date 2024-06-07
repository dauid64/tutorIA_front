import type TutorIAAPI from "$lib/api"
import type { Aluno } from "$lib/server/models/aluno"
import { fail } from "@sveltejs/kit"
import { setFlash } from "sveltekit-flash-message/server"

export const load = ( async ({ locals, cookies }) => {
    const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI
    const verifyData = await fetch("http://localhost:8080/api/verify", {
        method: "GET",
        credentials: "include"
    })
    const teste = await verifyData.json()
    console.log(teste)

    const response = await tutorIAAPI.fetchWrapper(
        'aluno',
        {
            method: 'GET'
        }
    )

    if (response.error) {
        setFlash({ type: 'error', message: 'Não foi possível encontrar os alunos.'}, cookies)
        return fail(400)
    }

    const data = await response.json()

    return { 
        'alunos': data.alunos as Aluno[]
    }
})