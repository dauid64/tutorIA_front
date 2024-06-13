import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { alunoSchema } from '$lib/server/models/aluno';
import type TutorIAAPI from '$lib/api';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { setFlash } from 'sveltekit-flash-message/server';
import { handleAPIError } from '$lib/utils/tutorIAAPIError';

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

        const responseCreateUser = await tutorIAAPI.fetchWrapper(
            'usuario',
            {
                method: 'POST',
                body: form.data
            }
        )

        if (!responseCreateUser.ok) {
            return await handleAPIError(cookies, responseCreateUser, 'Não foi possível criar o usuário.')
        }

        const responseCreateUserData = await responseCreateUser.json()

        form.data.usuario_id = responseCreateUserData.result.id

        const responseCreateAluno = await tutorIAAPI.fetchWrapper(
            'aluno',
            {
                method: 'POST',
                body: form.data
            }
        )

        if (!responseCreateAluno.ok) {
            return await handleAPIError(cookies, responseCreateAluno, 'Não foi possível criar o aluno.')
        }

        redirect("/dashboard/alunos", { type: 'success', message: 'Aluno criado com sucesso!'}, cookies)
    }
}