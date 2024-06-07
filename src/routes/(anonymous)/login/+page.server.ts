import { fail, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import type { RequestEvent } from "./$types"
import { authSchema } from "$lib/server/models/auth"
import type TutorIAAPI from "$lib/api"
import { redirect, setFlash } from "sveltekit-flash-message/server"
import * as set_cookie_parser from 'set-cookie-parser';
import type { CookieSerializeOptions } from "cookie"

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

        const response = await tutorIAAPI.fetchWrapper(
            'login',
            {
                method: 'POST',
                body: form.data
            }
        )

        if (response.error) {
            setFlash({ type: 'error', message: 'Não foi possível realizar o login.'}, cookies)
            return fail(400, { form })
        }

        const set_cookie = response.headers.get('set-cookie')
        if (set_cookie) {
            for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
                const { name, value, ...options } = set_cookie_parser.parseString(str, {
                    decodeValues: false
                });
                cookies.set(name, value, {
                    ...options as unknown as CookieSerializeOptions,
                    path: '/',
                    secure: false,
                    encode: (value) => value,
                });
            }
        }
        
        redirect("/dashboard", { type: 'success', message: 'Login realizado com sucesso!'}, cookies)
    }
}