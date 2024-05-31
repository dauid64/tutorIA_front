import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { UsuarioForCreate } from '$lib/server/models/usuario';
import type { alunoForCreate } from '$lib/server/models/aluno';
import type TutorIAAPI from '$lib/api';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event: RequestEvent) => {
        const { request, locals } = event
        const tutorIAAPI = locals.tutorIAAPI as TutorIAAPI

        const data = await request.formData();

        const username = data.get('username')?.toString()
        const pwd = data.get('pwd')?.toString()

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
            return responseCreateUserData
        }

        const userID = responseCreateUserData.result.id
        const nome = data.get('name')?.toString()

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
            return responseCreateUserData
        }

        throw redirect(302, "/dashboard")
    }
}