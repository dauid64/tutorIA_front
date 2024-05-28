import type { RequestEvent, HandleFetch } from '@sveltejs/kit';
import type { UsuarioForCreate } from '$lib/server/models/usuario';

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

        const response = await fetch(
            'http://localhost:8080/api/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioForCreate)
            }
        )

        const responseData = await response.json()

        return responseData
    }
}