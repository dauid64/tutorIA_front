import { materiaSchema } from "$lib/server/models/materia"
import { superValidate, withFiles } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import TutorIAAPI from "$lib/api"
import { fail, type RequestEvent } from "@sveltejs/kit"
import { redirect, setFlash } from "sveltekit-flash-message/server"
import { handleAPIError } from "$lib/utils/tutorIAAPIError"

export const load = (async () => {
    const form = await superValidate(zod(materiaSchema))

    return { form }
})

export const actions = {
    default: async (event: RequestEvent) => {
        const { request, locals, cookies } = event
        const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

        const formData = await request.formData();


        const form = await superValidate(formData, zod(materiaSchema))

        if (!form.valid) {
            return fail(400, withFiles({ form }))
        }

        const response = await tutorIAAPI.fetchWrapperWithMultiPart(
            "materia",
            {
                method: "POST",
                body: formData
            }
        )

        if (response.error) {
            return await handleAPIError(cookies, response, 'Não foi possível criar a matéria.')
        }

        redirect("/dashboard/materias", { type: 'success', message: 'Matéria criado com sucesso!'}, cookies)
    }
}