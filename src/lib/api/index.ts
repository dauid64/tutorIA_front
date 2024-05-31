import type { FetchOptions } from './types';

export default class TutorIAAPI{
    private baseURL: string
    private jwtToken?: string

    constructor(baseURL: string, jwtToken?: string) {
        this.baseURL = baseURL
        this.jwtToken = jwtToken
    }

    public async fetchWrapper(endpoint: string, options: FetchOptions) {
        try {
            const url = `${this.baseURL}${endpoint}`
            const headers = {
                'Content-Type': 'application/json'
            }
    
            const response = await fetch(url, {
                ...options,
                headers,
                body: JSON.stringify(options.body)
            })

            return response
        } catch (err: any) {
            throw Error(`Erro ao chamar a API. Erro: ${err.message}`)
        }
    }
}