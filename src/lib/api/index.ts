import type { FetchOptions } from './types';

export default class TutorIAAPI{
    private baseURL: string
    private jwtToken?: string

    constructor(baseURL: string, jwtToken?: string) {
        this.baseURL = baseURL
        this.jwtToken = jwtToken
    }

    public async fetchWrapper(endpoint: string, options: FetchOptions) {
        const url = `${this.baseURL}${endpoint}`
        const headers = {
            'Content-Type': 'application/json'
        }

        const response = await fetch(url, {
            ...options,
            headers,
            body: JSON.stringify(options.body)
        })

        if (!response.ok) {
            console.log(
                'Ocorreu um erro na resposta da chamada do TutoRIAAPI. Fazer tratamento dela.\n',
                `URL: ${url}`
            )
            const errorText = await response.text()
            console.log(errorText)

            try {
                const errorObj = JSON.parse(errorText)
                return { ...errorObj, status: response.status }
            } catch (e) {
                return { error: { message: 'SERVICE_ERROR', data: { detail: 'Erro inesperado ocorreu'}, status: 'error'}, status: response.status }
            }
        }

        return await response.json()
    }
}