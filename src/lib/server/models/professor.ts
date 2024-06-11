import { z } from 'zod'

export type Professor = {
    id: string,
    created_at: string,
    nome: string,
    username: string
}

const noSpaces = (val) => {
    if (/\s/.test(val)) {
        return false
    }
    return true
}

export const professorSchema = z.object({
    username: z.string({ message: 'Nome de usuário não pode estar em branco'}).trim().refine(noSpaces, {
        message: "O nome de usuário não pode conter espaços"
    }),
    pwd: z.string({ message: 'Senha não pode estar em branco'}).min(6).trim(),
    nome: z.string({ message: 'Nome não pode estar em branco'}),
    usuario_id: z.string().optional()
})