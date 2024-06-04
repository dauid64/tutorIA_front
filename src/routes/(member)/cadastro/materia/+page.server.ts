import { materiaSchema } from "$lib/server/models/materia"
import { superValidate, withFiles } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import type TutorIAAPI from "$lib/api"
import { fail, type RequestEvent } from "@sveltejs/kit"

export const load = (async () => {
    const form = await superValidate(zod(materiaSchema))

    return { form }
})

export const actions = {
    default: async (event: RequestEvent) => {
        const { request, locals, cookies } = event
        const formData = await request.formData();
        const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

        const form = await superValidate(formData, zod(materiaSchema))

        if (!form.valid) {
            return fail(400, withFiles({ form }))
        }

        console.log(form.data)
    }
}