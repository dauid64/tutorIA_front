import type { APIErrorResponse, APISuccessResponse, FetchOptions, FetchOptionsMultiPart } from './types';

export default class TutorIAAPI{
    private baseURL: string
    private jwtToken?: string

    constructor(baseURL: string, jwtToken?: string) {
        this.baseURL = baseURL
        this.jwtToken = jwtToken
    }

    public async fetchWrapper(endpoint: string, options: FetchOptions) {
        const url = `${this.baseURL}${endpoint}`
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.jwtToken}`
        }

        const response = await fetch(url, {
            ...options,
            headers,
            body: JSON.stringify(options.body),
        })
        
        if (!response.ok) {
            console.log(
                'Ocorreu um erro na resposta da chamada do TutoRIAAPI. Fazer tratamento dela.\n',
                `URL: ${url}`
            )
        }

        return response
    }

    public async fetchWrapperWithMultiPart(endpoint: string, options: FetchOptionsMultiPart) {
        const url = `${this.baseURL}${endpoint}`
        let headers = {
            'Authorization': `Bearer ${this.jwtToken}`
        }

        const response = await fetch(url, {
            ...options,
            headers,
            body: options.body,
            credentials: "include",
        })

        if (!response.ok) {
            console.log(
                'Ocorreu um erro na resposta da chamada do TutoRIAAPI. Fazer tratamento dela.\n',
                `URL: ${url}`
            )
        }

        return response
    }
}