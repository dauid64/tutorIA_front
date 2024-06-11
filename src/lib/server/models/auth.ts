import { z } from 'zod'

export type Auth = {
    id: string,
    nome: string
}

export const authSchema = z.object({
    username: z.string(),
    pwd: z.string()
})