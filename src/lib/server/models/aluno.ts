import { z } from 'zod'

export type alunoForCreate = {
    nome: String | undefined ,
    usuario_id: String  | undefined,
}

const noSpaces = (val) => {
    if (/\s/.test(val)) {
        return false
    }
    return true
}

export const alunoSchema = z.object({
    username: z.string({ message: 'Nome de usuário não pode estar em branco'}).trim().refine(noSpaces, {
        message: "O nome de usuário não pode conter espaços"
    }),
    pwd: z.string({ message: 'Senha não pode estar em branco'}).min(6).trim(),
    nome: z.string({ message: 'Nome não pode estar em branco'})
})