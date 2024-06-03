import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { alunoSchema, type alunoForCreate } from '$lib/server/models/aluno';
import type TutorIAAPI from '$lib/api';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { UsuarioForCreate } from '$lib/server/models/usuario';
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

        const username = form.data.username
        const pwd = form.data.pwd

        const usuarioForCreate: UsuarioForCreate = {
            username,
            pwd
        }

        const responseCreateUserData = await tutorIAAPI.fetchWrapper(
            'usuario',
            {
                method: 'POST',
                body: usuarioForCreate
            }
        )

        if (responseCreateUserData.error) {
            setFlash({ type: 'error', message: 'Não foi possível criar o aluno.'}, cookies)
            return fail(400, { form })
        }

        const userID = responseCreateUserData.result.id
        const nome = form.data.nome

        const alunoForCreate: alunoForCreate = {
            usuario_id: userID,
            nome: nome
        }

        const responseCreateAlunoData = await tutorIAAPI.fetchWrapper(
            'aluno',
            {
                method: 'POST',
                body: alunoForCreate
            }
        )

        if (responseCreateAlunoData.error) {
            setFlash({ type: 'error', message: 'Não foi possível criar o aluno.'}, cookies)
            return fail(400, { form })
        }

        redirect("/dashboard/alunos", { type: 'success', message: 'Aluno criado com sucesso!'}, cookies)
    }
}