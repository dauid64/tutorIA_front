import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { alunoSchema } from '$lib/server/models/aluno';
import type TutorIAAPI from '$lib/api';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { setFlash } from 'sveltekit-flash-message/server';

export const load = (async () => {
    const form = await superValidate(zod(alunoSchema))

    return { form }
})

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event: RequestEvent) => {
        const { request, locals, cookies } = event
        const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

        const form = await superValidate(request, zod(alunoSchema))

        if (!form.valid) {
            return fail(400, { form })
        }

        const responseCreateUserData = await tutorIAAPI.fetchWrapper(
            'usuario',
            {
                method: 'POST',
                body: form.data
            }
        )

        if (responseCreateUserData.error) {
            setFlash({ type: 'error', message: 'Não foi possível criar o usuário.'}, cookies)
            return fail(400, { form })
        }

        form.data.usuario_id = responseCreateUserData.result.id

        const responseCreateAlunoData = await tutorIAAPI.fetchWrapper(
            'aluno',
            {
                method: 'POST',
                body: form.data
            }
        )

        if (responseCreateAlunoData.error) {
            setFlash({ type: 'error', message: 'Não foi possível criar o aluno.'}, cookies)
            return fail(400, { form })
        }

        redirect("/dashboard/alunos", { type: 'success', message: 'Aluno criado com sucesso!'}, cookies)
    }
}