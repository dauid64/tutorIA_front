import { fail, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import type { RequestEvent } from "./$types"
import { authSchema } from "$lib/server/models/auth"
import type TutorIAAPI from "$lib/api"
import { redirect, setFlash } from "sveltekit-flash-message/server"

export const load = (async () => {
    const form = await superValidate(zod(authSchema))

    return { form }
})

export const actions = {
    default: async (event: RequestEvent) => {
        const { request, locals, cookies } = event
        const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

        const form = await superValidate(request, zod(authSchema))

        if (!form.valid) {
            return fail(400, { form })
        }

        const responseData = await tutorIAAPI.fetchWrapper(
            'login',
            {
                method: 'POST',
                body: form.data
            }
        )

        if (responseData.error) {
            setFlash({ type: 'error', message: 'Não foi possível realizar o login.'}, cookies)
            return fail(400, { form })
        }

        event.cookies.set("auth-login", "true", { path: '/'})
        redirect("/dashboard", { type: 'success', message: 'Login realizado com sucesso!'}, cookies)
    }
}