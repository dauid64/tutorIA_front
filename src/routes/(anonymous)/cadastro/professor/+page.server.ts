import type TutorIAAPI from "$lib/api"
import { professorSchema } from "$lib/server/models/professor"
import { fail, type RequestEvent } from "@sveltejs/kit"
import { redirect, setFlash } from "sveltekit-flash-message/server"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load = (async () => {
    const form = await superValidate(zod(professorSchema))

    return { form }
})

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event: RequestEvent) => {
        const { request, locals, cookies } = event
        const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

        const form = await superValidate(request, zod(professorSchema))

        if (!form.valid) {
            return fail(400, { form })
        }

        const responseCreateUser = await tutorIAAPI.fetchWrapper(
            'usuario',
            {
                method: 'POST',
                body: form.data
            }
        )

        if (responseCreateUser.error) {
            setFlash({ type: 'error', message: 'Não foi possível criar o usuário.'}, cookies)
            return fail(400, { form })
        }

        const responseCreateUserData = await responseCreateUser.json()

        form.data.usuario_id = responseCreateUserData.result.id

        const responseCreateAluno = await tutorIAAPI.fetchWrapper(
            'professor',
            {
                method: 'POST',
                body: form.data
            }
        )

        if (responseCreateAluno.error) {
            setFlash({ type: 'error', message: 'Não foi possível criar o professor.'}, cookies)
            return fail(400, { form })
        }

        

        redirect("/login", { type: 'success', message: 'Professor criado com sucesso!'}, cookies)
    }
}