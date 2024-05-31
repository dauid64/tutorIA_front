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

        try {
            const responseCreateUser = await tutorIAAPI.fetchWrapper(
                'usuario',
                {
                    method: 'POST',
                    body: usuarioForCreate
                }
            )

            const createUserData = await responseCreateUser.json()

            if (!responseCreateUser.ok) {
                return createUserData
            }

            const userID = createUserData.result.id
            const nome = data.get('name')?.toString()

            const alunoForCreate: alunoForCreate = {
                usuario_id: userID,
                nome: nome
            }

            const responseCreateAluno = await tutorIAAPI.fetchWrapper(
                'aluno',
                {
                    method: 'POST',
                    body: alunoForCreate
                }
            )

            const createAlunoData = await responseCreateAluno.json()

            if (!responseCreateAluno.ok) {
                return createAlunoData
            }
        } catch(err: any) {
            console.log('Erro ao chamar API.')
            return {
                'error': {
                    'data': {
                        'detail': 'Erro ao criar aluno'
                    }
                }
            }
        }  

        throw redirect(302, "/dashboard")
    }
}