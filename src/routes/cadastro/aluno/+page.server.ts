import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { UsuarioForCreate } from '$lib/server/models/usuario';
import type { alunoForCreate } from '$lib/server/models/aluno';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event: RequestEvent) => {
        const { request, fetch } = event
        const data = await request.formData();

        const username = data.get('username')?.toString()
        const pwd = data.get('pwd')?.toString()

        const usuarioForCreate: UsuarioForCreate = {
            username,
            pwd
        }

        const responseCreateUser = await fetch(
            'http://localhost:8080/api/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioForCreate)
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

        const responseCreateAluno = await fetch(
            'http://localhost:8080/api/aluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alunoForCreate)
            }
        )

        const createAlunoData = await responseCreateAluno.json()

        if (!responseCreateAluno.ok) {
            return createAlunoData
        }

        redirect(302, "/dashboard")
    }
}